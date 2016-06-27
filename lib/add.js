var prompt = require('./prompt');
var store = require('./store');

var path = require('path');
var access = require('fs').access;
var chalk = require('chalk');

module.exports = function(scope, point, args, force) {
  var destination = (args.length) ? path.resolve(args[0]) : process.cwd();

  // check the path
  access(destination, function(inaccessible) {
    if (inaccessible) {
      if (!force) { console.log(chalk.cyan(destination) + ' is not a valid path.'); }
      process.exit(1);
    }

    // load store in correct scope
    store = store(scope);

    // check if the warp point already exists
    var existing = store.get(point);
    var currentValue = (existing) ? existing.path : null;

    if (currentValue) {
      if (force) {
        store.set(point, destination);
        process.exit(0);
      }
      console.log(chalk.gray(point) + ' already points to ' + chalk.cyan(currentValue) + '.');

      prompt('Overwrite? (Y/n) ', function(input) {
        if (/^n$|^no$/i.test(input)) {
          console.log(chalk.red('add') + ' command aborted');
          process.exit(0);
        } else {
          store.set(point, destination);
          console.log('Warp point overwritten:\n  ' + chalk.gray(point) + '  =>  ' + chalk.cyan(destination));
          process.exit(0);
        }
      });
    } else {
      store.set(point, destination);
      if (!force) {
        console.log('New warp point:\n  ' + chalk.gray(point) + '  =>  ' + chalk.cyan(destination));
      }
    }
  });
};
