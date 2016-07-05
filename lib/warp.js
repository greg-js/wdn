var path = require('path');

var store = require('./store');
var isValidPath = require('./helpers/is-valid-path');

var scope = process.argv[2];
var point = process.argv[3];
var isSsh = process.argv[4];
var config = (process.argv[5]) ? path.resolve(process.argv[5]) : null;
var splitPoint = null;
var destination = null;
var relativeDest = null;
var pointObject = null;

if (!point) {
  console.error('You must provide a warp point');
} else {
  // support additional relative paths in points
  splitPoint = point.split(/[\\\/]/);
  if (splitPoint.length > 1) {
    point = splitPoint[0];
    relativeDest = splitPoint.slice(1);
  }

  pointObject = store(scope, config).get(point);
  destination = (pointObject) ? pointObject.path : null;

  // apply relative path to point if it was supplied
  // (like this: `wdn POINT/relative/path)
  if (relativeDest) {
    destination = path.resolve.apply(null, [destination].concat(relativeDest));
  }

  if (!destination) {
    return console.log(null);
  } else {
    // log the destination or the inaccessible message for use by the bash script
    if (isSsh || isValidPath(destination)) {
      console.log(destination);
    } else {
      console.log('inaccessible');
    }
  }
}
