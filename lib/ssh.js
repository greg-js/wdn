var loadSshConfig = require('./helpers/load-ssh-config');
var add = require('./add');
var remove = require('./remove');
var clear = require('./clear');
var list = require('./list');
var show = require('./show');

var chalk = require('chalk');

function sshAdd(host, opts, force, config) {
  var point = opts[0];
  var path = opts[1];
  return add(host, point, path, force, config);
}

function sshRemove(host, opts, force, config) {
  var point = opts[0];
  return remove(host, point, force, config);
}

function sshClear(host, opts, force, config) {
  return clear(host, force, config);
}

function sshList(host, opts, force, config) {
  return list(host, force, config);
}

function sshShow(host, opts, force, config) {
  var arg = opts[0];
  return show(host, arg, force, config);
}

module.exports = function(args, force, config, customSshConfig) {
  return loadSshConfig(function(err, hosts) {
    if (err) { throw err; }
    var host = args[0];

    if (hosts.indexOf(host) === -1) {
      if (!force) {
        console.log(chalk.magenta(host) + ' is not a valid host.'
                    + ' Check or edit your ~/.ssh/config if it should be.');
      }
      return false;
    }

    switch (args[1]) {
      case 'add':
      case 'a':
      case '-a':
      case '--add':
        return sshAdd(host, args.slice(2), force, config);
      case 'remove':
      case 'rm':
      case '-rm':
      case '--rm':
      case '--remove':
        return sshRemove(host, args.slice(2), force, config);
      case 'clear':
      case '--clear':
      case '--remove-all':
      case '--rm-all':
        return sshClear(host, args.slice(2), force, config);
      case 'list':
      case 'ls':
      case '--ls':
      case '-ls':
        return sshList(host, args.slice(2), force, config);
      case 'show':
      case 's':
      case '--show':
      case '-s':
        return sshShow(host, args.slice(2), force, config);
      default:
        throw new Error('ssh command not recognized');
    }
  }, customSshConfig);
};
