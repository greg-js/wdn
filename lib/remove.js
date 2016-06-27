var prompt = require('./prompt');

var path = require('path');
var storage = require('node-persist');
var chalk = require('chalk');

module.exports = function(point, force) {

  storage.init({
    dir: path.resolve(process.env['HOME'], '.config', 'wdn')
  }).then(function() {

    if (force) {
      storage.removeItem(point);
      process.exit(0);
    }

    // check if the warp point already exists
    storage.getItem(point, function(err, currentValue) {
      if (err) { throw err; }

      if (currentValue) {
        console.log(chalk.gray(point) + ' currently points to ' + chalk.cyan(currentValue) + '.');

        prompt('Remove? (Y/n) ', function(input) {
          if (/^n$|^no$/i.test(input)) {
            console.log('Aborted');
            process.exit(0);
          } else {
            storage.removeItem(point).then(function() {
              console.log('The ' + chalk.gray(point) + ' warp point has been deleted.');
              process.exit(0);
            });
          }
        });
      } else {

        if (!force) {
          console.log(chalk.gray(point) + ' is not a valid warp point.')
        }
        process.exit(0);
      }
    });
  }).catch(function(err) {
    console.error(err);
  });
};
