var path = require('path');

var isValidPath = require('./helpers/is-valid-path');

var scope = process.argv[2];
var point = process.argv[3];
var config = (process.argv[4]) ? path.resolve(process.argv[4]) : null;

warp(scope, point, config);

function warp(scope, point, config) {
  var store = require('./store')(config);
  var scopedStore = store(scope);
  var splitPoint = null;
  var destination = null;
  var relativeDest = null;
  var pointObject = null;

  if (!point) {
    console.error('You must provide a warp point');
    return false;
  } else {
    // support additional relative paths in points
    splitPoint = point.split(/[\\\/]/);
    if (splitPoint.length > 1) {
      point = splitPoint[0];
      relativeDest = splitPoint.slice(1);
    }

    pointObject = scopedStore.get(point);
    destination = (pointObject) ? pointObject.path : null;

    // apply relative path to point if it was supplied
    // (like this: `wdn POINT/relative/path)
    if (relativeDest) {
      if (scope === 'local') {
        destination = path.resolve
          .apply(null, [destination].concat(relativeDest));
      } else {
        destination = path.join
          .apply(null, [destination].concat(relativeDest));
      }
    }

    if (!destination) {
      console.log(null);
      return null;
    } else {
      // log the destination or the inaccessible message
      // for use by the bash script
      if (scope !== 'local' || isValidPath(destination)) {
        console.log(destination);
        return destination;
      } else {
        console.log('inaccessible');
        return 'inaccessible';
      }
    }
  }
}

module.exports = warp;
