var store = require('./store');
var table = require('text-table');
var chalk = require('chalk');

module.exports = function(scope, force) {
  var output = [];
  store = store(scope);

  if (store.length === 0) {
    console.log('No warp points have been set yet.');
    process.exit(0);
  }

  // build (or log) the output array
  store.forEach(function(pointObject) {
    if (!force) {
      output.push(['', chalk.gray(pointObject.point), '=>', chalk.cyan(pointObject.path)]);
    } else {
      console.log(pointObject.path);
    }
  });

  if (force) {
    process.exit(0);
  }

  // alphabetic sort
  output = output.sort(function(a, b) {
    return (chalk.stripColor(a[1])).toLowerCase().localeCompare((chalk.stripColor(b[1])).toLowerCase());
  });

  // pretty table formatting
  console.log(table(output, {
    align: ['l', 'r', 'l', 'l'],
    stringLength: function(str) { return chalk.stripColor(str).length; }
  }));
};
