var prompt = require('./prompt');
var store = require('./store');

var chalk = require('chalk');

module.exports = function(scope, force) {
  store = store(scope);

  if (force) {
    store.clear();
    process.exit(0);
  }

  prompt('Are you sure you want to ' + chalk.red('delete all your warp points?') + ' (y/N) ', function(input) {
    if (/^y$|^yes$/i.test(input)) {
      store.clear();
      console.log(chalk.gray('All warp points successfully cleared.'));
      process.exit(0);
    } else {
      console.log('Aborted.');
      process.exit(0);
    }
  });
};
