// http://josscrowcroft.github.com/open-exchange-rates/

var agent = require('superagent')
  , cheerio = require('cheerio')
  , moment = require('moment')
  , feedParser = require('feedparser')
  , _ = require('underscore');

let headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11'
  , 'Cache-Control': 'no-cache'
  , 'Pragma': 'no-cache'
}

process.stderr.write("\007");

cheerio.prototype.make = function(dom, context) {
  if(dom.cheerio) return dom;
  dom = (_.isArray(dom)) ? dom : [dom];
  context || (context = new cheerio())
  return _.extend(context, dom, { length : dom.length, find: context.find });
};
let maxId = 0;

function scrape(){
  agent
  .get('https://austin.craigslist.org/search/sga?query=weight')
  .buffer(true)
  .set(headers)
  .end(function(err, res){
    console.log(res.text);
    var $ = cheerio.load(res.text);

      $('.result-row').each(function(index, element) {
        element = $(element)
        var id = element.attr('data-pid');
      });
  });
}
scrape();
setTimeout(scrape, 180000);



var mailer = require("nodemailer");

// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "jw56578@gmail.com",
        pass: "zjbajehpixqiokug"
    }
});

var mail = {
    from: "Jon Woo <jw56578@gmail.com>",
    to: "jw56578@gmail.com",
    subject: "Send Email Using Node.js",
    text: "Node.js New world for me",
    html: "<b>Node.js New world for me</b>"
}

smtpTransport.sendMail(mail, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    smtpTransport.close();
});