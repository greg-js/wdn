var isValidPath = require('./is-valid-path');
var path = require('path');
var fs = require('fs');
var parse = require('ssh-config-parser');

var sshConfig = path.resolve(process.env.HOME, '.ssh', 'config');

module.exports = function(cb, customSshConfig) {
  if (customSshConfig) {
    // this is mostly just for testing
    sshConfig = path.resolve(customSshConfig);
  }

  if (!isValidPath(sshConfig)) {
    return cb('You lack an ssh config file.');
  }

  fs.readFile(sshConfig, 'utf8', function(err, data) {
    if (err) { cb(err); }
    return cb(null, parse(data));
  });
};
