var table = require('text-table');
var chalk = require('chalk');

module.exports = function(scope, force, config, test) {
  var store = require('./store')(scope, config);
  var output = [];

  if (store.length === 0) {
    if (!force) {
      console.log('No warp points have been set yet.');
    }
    return false;
  }

  // build (or log) the output array
  store.forEach(function(pointObject) {
    if (!force) {
      output.push([
        '',
        chalk.gray(pointObject.point),
        '=>',
        chalk.cyan(pointObject.path)
      ]);
    } else {
      if (!test) {
        console.log(pointObject.path);
      }
    }
  });

  if (force) {
    return true;
  }

  // alphabetic sort
  output = output.sort(function(a, b) {
    return (chalk.stripColor(a[1])).toLowerCase()
      .localeCompare((chalk.stripColor(b[1])).toLowerCase());
  });

  // pretty table formatting
  console.log(table(output, {
    align: ['l', 'r', 'l', 'l'],
    stringLength: function(str) { return chalk.stripColor(str).length; }
  }));

  return output;
};
