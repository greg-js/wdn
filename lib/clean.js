var store = require('./store');

var chalk = require('chalk');
var access = require('fs').accessSync;

module.exports = function(scope, force) {
  var deleted = [];
  var ln = null, potPlural = null;

  // must call the store functions explicitly with scope as said scope will change
  // after deleting an item
  store(scope).forEach(function(pointObject) {
    var destination = pointObject.path;
    try {
      access(destination);
    } catch (e) {
      store(scope).remove(pointObject.point);
      deleted.push(pointObject.point);
    }
  });

  if (force) { process.exit(0); }
  ln = deleted.length;

  if (!ln) {
    console.log('No broken warp points detected.');
    process.exit();
  }

  potPlural = (ln > 1) ? 's have' : ' has';
  deleted = deleted.slice(1).reduce(function(p, c) {
    return p + ', ' + chalk.gray(c);
  }, chalk.gray(deleted[0]));

  console.log('The following broken warp point' + potPlural + ' been removed: ', deleted);
};
