var isValidPath = require('./is-valid-path');
var path = require('path');
var fs = require('fs');
var parse = require('ssh-config-parser');

module.exports = function(cb, customSshConfig, customSystemSshConfig) {
  var sshConfig = path.resolve(process.env.HOME, '.ssh', 'config');
  var systemSshConfig = path.resolve('/etc', 'ssh', 'ssh_config');
  var result;

  if (customSshConfig) {
    sshConfig = path.resolve(customSshConfig);
  }

  if (customSystemSshConfig) {
    systemSshConfig = path.resolve(customSystemSshConfig);
  }

  if (!isValidPath(systemSshConfig) && !isValidPath(sshConfig)) {
    return cb(new Error('You lack an ssh config file.'));
  }

  if (isValidPath(systemSshConfig)) {
    if (isValidPath(sshConfig)) {
      result = getSshConfig(sshConfig).concat(getSshConfig(systemSshConfig));
      return cb(null, result);
    } else {
      result = getSshConfig(systemSshConfig);
      return cb(null, result);
    }
  } else {
    result = getSshConfig(sshConfig);
    return cb(null, result);
  }

  function getSshConfig(config) {
    return parse(fs.readFileSync(config, 'utf8')).map(getHost);
  }

  function getHost(item) { return item.Host; }
};
