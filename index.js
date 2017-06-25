module.exports = require('./lib/api');

var api = require('./lib/api');
return;
api.getList('http://www.google.com', function(error, data) {
  console.log("data", data)

});
