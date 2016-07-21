var prompt = require('./helpers/prompt');
var isTesting = require('./helpers/is-testing');
var isValidPath = require('./helpers/is-valid-path')

var path = require('path');
var chalk = require('chalk');

module.exports = function(scope, point, args, force, config) {
  var store = require('./store')(config);
  // load store in correct scope
  var scopedStore = store(scope);

  var destination = null;

  if (scope === 'local') {
    destination = (args.length) ? path.resolve(args[0]) : process.cwd();
  } else {
    // sshAdd passes in a single string `args`
    destination = (args.length) ? args : ' ';
  }

  // check the path for local points
  if (scope === 'local' && !isValidPath(destination)) {
    if (!force) { console.log(chalk.cyan(destination) + ' is not a valid path.'); }
    return false;
  }

  // check if the warp point already exists
  var existing = scopedStore.get(point);
  var currentValue = (existing) ? existing.path : null;

  if (currentValue) {
    if (force) {
      scopedStore.set(point, destination);

      return {
        point: point,
        path: destination
      };
    }
    console.log(chalk.gray(point) + ' already points to ' + chalk.cyan(currentValue) + '.');

    return prompt('Overwrite? (' + chalk.bold('Y') + '/' + chalk.bold('n') + ')')
      .then(function(input) {
        if (/^n$|^no$/i.test(input)) {
          console.log('Aborted');
          return false;
        } else {
          scopedStore.set(point, destination);
          console.log('Warp point overwritten:\n  ' + chalk.gray(point) +
                      '  =>  ' + chalk.cyan(destination));
          return {
            point: point,
            path: destination
          };
        }
      })
      .finally(function() {
        if (!isTesting()) {
          process.exit(0);
        }
      });

  } else {
    scopedStore.set(point, destination);

    if (!force) {
      console.log('New warp point:\n  ' + chalk.gray(point) + '  =>  ' + chalk.cyan(destination));
    }

    return {
      point: point,
      path: destination
    };
  }
};
