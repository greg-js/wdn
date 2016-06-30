var prompt = require('./prompt');
var store = require('./store');

var chalk = require('chalk');

module.exports = function(scope, point, force, config) {
  store = store(scope, config);

  if (force) {
    store.remove(point);
    process.exit(0);
  }

  // check if the warp point already exists
  var existing = store.get(point);
  var currentValue = (existing) ? existing.path : null;

  if (currentValue) {
    console.log(chalk.gray(point) + ' currently points to ' + chalk.cyan(currentValue) + '.');

    prompt('Remove? (Y/n) ', function(input) {
      if (/^n$|^no$/i.test(input)) {
        console.log('Aborted');
        process.exit(0);
      } else {
        store.remove(point);
        console.log('The ' + chalk.gray(point) + ' warp point has been deleted.');
        process.exit(0);
      }
    });
  } else {

    if (!force) {
      console.log(chalk.gray(point) + ' is not a valid warp point.')
    }
    process.exit(0);
  }
};
