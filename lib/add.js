var prompt = require('./prompt');

var path = require('path');
var storage = require('node-persist');
var access = require('fs').access;
var chalk = require('chalk');

module.exports = function(point, args, force) {
  var destination = (args.length) ? path.resolve(args[0]) : process.cwd();

  // check the path
  access(destination, function(inaccessible) {
    if (inaccessible) {
      if (!force) { console.log(chalk.cyan(destination) + ' is not a valid path.'); }
      process.exit(1);
    }

    // open storage
    storage.init({
      dir: path.resolve(process.env['HOME'], '.config', 'wdn')
    }).then(function() {

      // check if the warp point already exists
      storage.getItem(point, function(err, currentValue) {
        if (err) { throw err; }

        if (currentValue) {
          if (force) {
            storage.setItem(point, destination);
            process.exit(0);
          }
          console.log(chalk.gray(point) + ' already points to ' + chalk.cyan(currentValue) + '.');

          prompt('Overwrite? (Y/n) ', function(input) {
            if (/^n$|^no$/i.test(input)) {
              console.log(chalk.red('add') + ' command aborted');
              process.exit(0);
            } else {
              storage.setItem(point, destination).then(function() {
                console.log('Warp point overwritten:\n  ' + chalk.gray(point) + '  =>  ' + chalk.cyan(destination));
                process.exit(0);
              });
            }
          });
        } else {
          storage.setItem(point, destination).then(function() {
            if (!force) {
              console.log('New warp point:\n  ' + chalk.gray(point) + '  =>  ' + chalk.cyan(destination));
            }
          });
        }
      });
    }).catch(function(err) {
      console.error(err);
    });
  });
};
