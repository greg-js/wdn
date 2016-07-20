var prompt = require('./helpers/prompt');
var isTesting = require('./helpers/is-testing');

var chalk = require('chalk');

module.exports = function(scope, point, force, config) {
  var store = require('./store')(config);
  var scopedStore = store(scope);

  // check if the warp point already exists
  var existing = scopedStore.get(point);
  var currentValue = (existing) ? existing.path : null;

  if (currentValue) {
    if (force) {
      scopedStore.remove(point);
      return true;
    }

    console.log(chalk.gray(point) + ' currently points to '
                + chalk.cyan(currentValue) + '.');

    return prompt('Remove? (Y/n) ')
      .then(function(input) {
        if (/^n$|^no$/i.test(input)) {
          console.log('Aborted');
          return false;
        } else {
          scopedStore.remove(point);
          console.log('The ' + chalk.gray(point)
                      + ' warp point has been deleted.');
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
