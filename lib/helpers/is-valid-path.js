var access = require('fs').accessSync;
var path = require('path');

module.exports = function(dir) {
  try {
    access(path.resolve(dir));
    return true;
  } catch (e) {
    return false;
  }
};
