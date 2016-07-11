var prompt = require('./helpers/prompt');
var isTesting = require('./helpers/is-testing');
var isValidPath = require('./helpers/is-valid-path')

var path = require('path');
var chalk = require('chalk');

module.exports = function(scope, point, args, force, config) {
  var store = require('./store');
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

  // load store in correct scope
  store = store(scope, config);

  // check if the warp point already exists
  var existing = store.get(point);
  var currentValue = (existing) ? existing.path : null;

  if (currentValue) {
    if (force) {
      store.set(point, destination);

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
          store.set(point, destination);
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
    store.set(point, destination);

    if (!force) {
      console.log('New warp point:\n  ' + chalk.gray(point) + '  =>  ' + chalk.cyan(destination));
    }

    return {
      point: point,
      path: destination
    };
  }
};
