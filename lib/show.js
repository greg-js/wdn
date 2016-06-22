var path = require('path');
var storage = require('node-persist');
var chalk = require('chalk');
var table = require('text-table');

module.exports = function(arg) {
  storage.init({
    dir: path.resolve(process.env['HOME'], '.config', 'wdn')
  }).then(function() {
    var keys = storage.keys();
    var values = storage.values();

    if (keys.indexOf(arg) !== -1) {
      storage.getItem(arg, function(err, value) {
        if (err) { throw err; }
        console.log('  ' + chalk.gray(arg) + ' => ' + chalk.cyan(value))
      });
    } else if (values.indexOf(arg) !== -1) {
      var output = [];
      storage.forEach(function(key) {
        var value = storage.getItem(key);

        if (path.resolve(value) === path.resolve(arg)) {
          output.push(['', chalk.gray(key), '=>', chalk.cyan(value)]);
        }
      });
      console.log(table(output, {
        align: ['l', 'r', 'l', 'l'],
        stringLength: function(str) { return chalk.stripColor(str).length; }
      }));
    } else {
      console.log('No paths or warp points found for the given query.');
    }

  }).catch(function(err) {
    console.error(err);
  });
};
