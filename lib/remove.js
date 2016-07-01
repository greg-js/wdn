var prompt = require('./prompt');

var chalk = require('chalk');

module.exports = function(scope, point, force, config) {
  var store = require('./store')(scope, config);

  // check if the warp point already exists
  var existing = store.get(point);
  var currentValue = (existing) ? existing.path : null;

  if (currentValue) {
    if (force) {
      store.remove(point);
      return true;
    }

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

    return false;
  }
};
