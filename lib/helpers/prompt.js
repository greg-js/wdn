var Promise = require('bluebird');

// prompt the user for a response, then return a promise with the response
module.exports = function(text) {
  console.log(text);
  return new Promise(function(resolve) {
    process.stdin.once('data', function(data) {
      resolve(data.toString().trim());
    });
  });
};
