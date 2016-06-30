var store = require('./store');

var path = require('path');
var chalk = require('chalk');
var table = require('text-table');

module.exports = function(scope, arg, force, config) {
  store = store(scope, config);
  var points = store.points();
  var paths = store.paths();

  // when given a point, find and display the path
  if (points.indexOf(arg) !== -1) {
    var pth = store.get(arg).path;
    if (force) {
      console.log(pth);
      process.exit(0);
    }
    console.log('  ' + chalk.gray(arg) + ' => ' + chalk.cyan(pth))

  // when given a path, find and display all points pointing to it
  } else if (paths.indexOf(arg) !== -1) {
    var output = [];

    store.forEach(function(pointObject) {
      var pth = pointObject.path;
      var point = pointObject.point;
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
};
