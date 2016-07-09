var path = require('path');
var chalk = require('chalk');
var table = require('text-table');

module.exports = function(scope, arg, force, config) {
  var store = require('./store')(scope, config);

  var points = store.points();
  var paths = store.paths();

  // when given a point, find and display the path
  if (points.indexOf(arg) !== -1) {
    var pth = store.get(arg).path;
    if (force) {
      console.log(pth);
      return pth;
    }
    console.log('  ' + chalk.gray(arg) + ' => ' + chalk.cyan(pth))
    return pth;

  // when given a path, find and display all points pointing to it
  } else if (paths.indexOf(path.resolve(arg)) !== -1) {
    var output = [];

    store.forEach(function(pointObject) {
      var pth = pointObject.path;
      var point = pointObject.point;
      if (path.resolve(pth) === path.resolve(arg)) {
        if (force) {
          output.push(point);
        } else {
          output.push(['', chalk.gray(point), '=>', chalk.cyan(pth)]);
        }
      }
    });

    if (force) {
      output.forEach(function(item) { console.log(item); });
      return output;
    }
    console.log(table(output, {
      align: ['l', 'r', 'l', 'l'],
      stringLength: function(str) { return chalk.stripColor(str).length; }
    }));
    return output;

  } else {
    if (force) { return false; }
    console.log('No paths or warp points found for the given query.');
    return false;
  }
};
