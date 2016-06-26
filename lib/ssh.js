var loadSshConfig = require('./helpers/load-ssh-config');

module.exports = function(args) {
  loadSshConfig(function(err, hosts) {
    if (err) { throw err; }

  });
};
