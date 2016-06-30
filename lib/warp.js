var path = require('path');

var store = require('./store');
var isValidPath = require('./helpers/is-valid-path');

var scope = process.argv[2];
var point = process.argv[3];
var isSsh = process.argv[4];
var config = (process.argv[5]) ? path.resolve(process.argv[5]) : null;
var destination = null;
var pointObject = null;

if (!point) {
  console.error('You must provide a warp point');
} else {
  pointObject = store(scope, config).get(point);
  destination = (pointObject) ? pointObject.path : null;

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
