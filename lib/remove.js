var prompt = require('./helpers/prompt');
var isTesting = require('./helpers/is-testing');

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

    return prompt('Remove? (Y/n) ')
      .then(function(input) {
        if (/^n$|^no$/i.test(input)) {
          console.log('Aborted');
          return false;
        } else {
          store.remove(point);
          console.log('The ' + chalk.gray(point) + ' warp point has been deleted.');
          return true;
        }
      })
      .finally(function() {
        if (!isTesting()) {
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
