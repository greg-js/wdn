var isValidPath = require('./is-valid-path');
var path = require('path');
var fs = require('fs');
var parse = require('ssh-config-parser');

var systemSshConfig = path.resolve('/etc', 'ssh', 'ssh_config');
var sshConfig = path.resolve(process.env.HOME, '.ssh', 'config');

module.exports = function(cb, customSshConfig) {
  if (customSshConfig) {
    // this is mostly just for testing
    sshConfig = path.resolve(customSshConfig);
  }

  if (!isValidPath(systemSshConfig) && !isValidPath(sshConfig)) {
    return cb('You lack an ssh config file.');
  }

  if (isValidPath(systemSshConfig)) {
    fs.readFile(systemSshConfig, 'utf8', function(err, systemData) {
      if (err) { cb(err); }
      fs.readFile(sshConfig, 'utf8', function(err, userData) {
        if (err) { cb(err); }
        var result = parse(systemData);
        userData = parse(userData);
        userData.forEach(function(config) {
          if (result.indexOf(config) !== -1) {
            result[result.indexOf(config)] = config;
          } else {
            result.push(config);
          }
        });

        return cb(null, result);
      });
    });
  } else {
    fs.readFile(sshConfig, 'utf8', function(err, data) {
      if (err) { cb(err); }
      return cb(null, data);
    });
  }
};
