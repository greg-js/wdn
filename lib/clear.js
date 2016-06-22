var prompt = require('./prompt');

var path = require('path');
var storage = require('node-persist');
var chalk = require('chalk');

module.exports = function() {

  storage.init({
    dir: path.resolve(process.env['HOME'], '.config', 'wdn')
  }).then(function() {

    prompt('Are you sure you want to ' + chalk.red('delete all your warp points?') + ' (y/N) ', function(input) {
      if (/^y$|^yes$/i.test(input)) {
        storage.clear().then(function() {
          console.log(chalk.gray('All warp points successfully cleared.'));
          process.exit(0);
        });
      } else {
        process.exit(0);
      }
    });
  }).catch(function(err) {
    console.error(err);
  });
};
