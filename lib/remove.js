var prompt = require('./prompt');

var path = require('path');
var storage = require('node-persist');
var chalk = require('chalk');

module.exports = function(warpPoint) {

  storage.init({
    dir: path.resolve(process.env['HOME'], '.config', 'wdn')
  }).then(function() {

    // check if the warp point already exists
    storage.getItem(warpPoint, function(err, currentValue) {
      if (err) { throw err; }

      if (currentValue) {
        console.log(chalk.gray(warpPoint) + ' currently points to ' + chalk.gray(currentValue) + '.');

        prompt('Remove? (Y/n) ', function(input) {
          if (/^n$|^no$/i.test(input)) {
            console.log(chalk.red('remove') + ' command aborted.');
            process.exit(0);
          } else {
            storage.removeItem(warpPoint).then(function() {
              console.log('The ' + chalk.gray(warpPoint) + ' warp point has been deleted.');
              process.exit(0);
            });
          }
        });
      } else {
        console.log(chalk.gray(warpPoint) + ' is not a valid warp point.')
        process.exit(0);
      }
    });
  }).catch(function(err) {
    console.error(err);
  });
};
