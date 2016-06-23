var path = require('path');
var storage = require('node-persist');
var access = require('fs').access;

storage.init({
  dir: path.resolve(process.env['HOME'], '.config', 'wdn')
}).then(function() {
  var warp = process.argv[2];

  if (!warp) {
    console.error('You must provide a warp point');
  } else {
    storage.getItem(warp, function(err, destination) {
      if (err) { throw err; }

      if (!destination) {
        return console.log(undefined)
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
    });
  }
}).catch(function(err) {
  console.error(err);
});
