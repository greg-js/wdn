var path = require('path');
var storage = require('node-persist');
var chalk = require('chalk');
var access = require('fs').accessSync;

module.exports = function() {
  storage.init({
    dir: path.resolve(process.env['HOME'], '.config', 'wdn')
  }).then(function() {
    var deleted = [];
    var ln = null, potPlural = null;

    storage.forEach(function(point) {
      var destination = storage.getItemSync(point);
      try {
        access(destination);
      } catch (e) {
        storage.removeItemSync(point);
        deleted.push(point);
      }
    });

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
  }).catch(function(err) {
    console.error(err);
  });
};
