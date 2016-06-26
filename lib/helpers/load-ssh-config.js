var path = require('path');
var fs = require('fs');
var parse = require('ssh-config-parser');

var sshConfig = path.resolve(process.env.HOME, '.ssh', 'config');

module.exports = function(cb) {
  fs.access(sshConfig, function(inaccessible) {
    if (inaccessible) {
      return [];
    }
    fs.readFile(sshConfig, 'utf8', function(err, data) {
      if (err) { cb(err); }
      return cb(null, parse(data));
    });
  });
};
