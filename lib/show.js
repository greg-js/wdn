var path = require('path');
var storage = require('node-persist');
var chalk = require('chalk');
var table = require('text-table');

module.exports = function(arg, force) {
  storage.init({
    dir: path.resolve(process.env['HOME'], '.config', 'wdn')
  }).then(function() {
    var points = storage.keys();
    var paths = storage.values();

    // when given a point, find and display the path
    if (points.indexOf(arg) !== -1) {
      storage.getItem(arg, function(err, pth) {
        if (err) { throw err; }
        if (force) {
          console.log(pth);
          process.exit(0);
        }
        console.log('  ' + chalk.gray(arg) + ' => ' + chalk.cyan(pth))
      });

    // when given a path, find and display all points pointing to it
    } else if (paths.indexOf(arg) !== -1) {
      var output = [];

      storage.forEach(function(point) {
        var pth = storage.getItem(point);
        if (path.resolve(pth) === path.resolve(arg)) {
          if (force) { console.log(point); }
          output.push(['', chalk.gray(point), '=>', chalk.cyan(pth)]);
        }
      });

      if (force) { process.exit(0); }
      console.log(table(output, {
        align: ['l', 'r', 'l', 'l'],
        stringLength: function(str) { return chalk.stripColor(str).length; }
      }));

    } else {
      if (force) { process.exit(404); }
      console.log('No paths or warp points found for the given query.');
    }
  }).catch(function(err) {
    console.error(err);
  });
};
