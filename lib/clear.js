var prompt = require('./helpers/prompt');
var isTesting = require('./helpers/is-testing');

var chalk = require('chalk');

module.exports = function(scope, force, config) {
  var store = require('./store')(config);
  var scopedStore = store(scope);

  if (force) {
    scopedStore.clear();
    return true;
  }

  return prompt('Are you sure you want to '
                + chalk.red('delete all your warp points?')
                + ' (' + chalk.bold('y') + '/' + chalk.bold('N') + ') ')
    .then(function(input) {
      if (/^y$|^yes$/i.test(input)) {
        scopedStore.clear();
        console.log(chalk.gray('All warp points successfully cleared.'));
        return true;
      } else {
        console.log('Aborted.');
        return false;
      }
    })
    .finally(function() {
      if (!isTesting()) {
        process.exit(0);
      }
    });
};
