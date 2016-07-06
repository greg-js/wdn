var store = require('./store');
var isValidPath = require('./helpers/is-valid-path');

var chalk = require('chalk');

module.exports = function(scope, force, config) {
  var deleted = [];
  var ln = null, potPlural = null;

  store(scope, config).forEach(function(pointObject) {
    var destination = pointObject.path;
    if (!isValidPath(destination)) {
      // must call with scope again to reflect the changes after deleting the item
      store(scope, config).remove(pointObject.point);
      deleted.push(pointObject.point);
    }
  });

  if (force) { return true; }
  ln = deleted.length;

  if (!ln) {
    console.log('No broken warp points detected.');
    return true;
  }

  potPlural = (ln > 1) ? 's have' : ' has';
  deleted = deleted.slice(1).reduce(function(p, c) {
    return p + ', ' + chalk.gray(c);
  }, chalk.gray(deleted[0]));

  console.log('The following broken warp point' + potPlural + ' been removed: ', deleted);
  return true;
};
