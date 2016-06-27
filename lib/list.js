var path = require('path');
var storage = require('node-persist');
var table = require('text-table');
var chalk = require('chalk');

module.exports = function(force) {
  storage.init({
    dir: path.resolve(process.env['HOME'], '.config', 'wdn')
  }).then(function() {
    var output = [];

    if (storage.length() === 0) {
      console.log('No warp points have been set yet.');
      process.exit(0);
    }

    storage.forEach(function(key) {
      if (!force) {
        output.push(['', chalk.gray(key), '=>', chalk.cyan(storage.getItem(key))]);
      } else {
        console.log(storage.getItem(key));
      }
    });

    if (force) {
      process.exit(0);
    }

    console.log(table(output, {
      align: ['l', 'r', 'l', 'l'],
      stringLength: function(str) { return chalk.stripColor(str).length; }
    }));
  }).catch(function(err) {
    console.error(err);
  });
};
