var store = require('./store');

var access = require('fs').access;

var scope = process.argv[2];
var point = process.argv[3];
var destination = null;
var pointObject = null;

if (!point) {
  console.error('You must provide a warp point');
} else {
  pointObject = store(scope).get(point);
  destination = (pointObject) ? pointObject.path : null;

  if (!destination) {
    return console.log(null);
  } else {
    access(destination, function(inaccessible) {
      if (inaccessible) {
        // this will get picked up by the bash script
        return console.log('inaccessible');
      } else {
        // the destination is simply logged so the shell script can `cd` to it
        return console.log(destination);
      }
    });
  }
}
