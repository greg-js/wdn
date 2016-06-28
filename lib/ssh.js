var loadSshConfig = require('./helpers/load-ssh-config');
var add = require('./add');
var remove = require('./remove');
var clear = require('./clear');
var list = require('./list');
var show = require('./show');

var chalk = require('chalk');

function sshAdd(host, opts, force) {
  var point = opts[0];
  var path = opts[1];
  add(host, point, path, force);
}

function sshRemove(host, opts, force) {
  var point = opts[0];
  remove(host, point, force);
}

function sshClear(host, opts, force) {
  clear(host, force);
}

function sshList(host, opts, force) {
  list(host, force);
}

function sshShow(host, opts, force) {
  var arg = opts[0];
  show(host, arg, force);
}

module.exports = function(args, force) {
  loadSshConfig(function(err, hosts) {
    if (err) { throw err; }
    var host = args[0];

    if (hosts.map(function(h) { return h.Host; }).indexOf(host) === -1) {
      console.log(chalk.magenta(host),
                  'is not a valid host. Check or edit your ~/.ssh/config if it should be.');
      process.exit(1);
    }

    switch (args[1]) {
      case 'add':
      case 'a':
      case '-a':
      case '--add':
        sshAdd(host, args.slice(2), force);
        break;
      case 'remove':
      case 'rm':
      case '-rm':
      case '--rm':
      case '--remove':
        sshRemove(host, args.slice(2), force);
        break;
      case 'clear':
      case '--clear':
      case '--remove-all':
      case '--rm-all':
        sshClear(host, args.slice(2), force);
        break;
      case 'list':
      case 'ls':
      case '--ls':
      case '-ls':
        sshList(host, args.slice(2), force);
        break;
      case 'show':
      case 's':
      case '--show':
      case '-s':
        sshShow(host, args.slice(2), force);
        break;
    }
  });
};
