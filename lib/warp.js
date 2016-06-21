var path = require('path');
var storage = require('node-persist');

storage.init({
  dir: path.resolve(process.env['HOME'], '.config', 'wdn')
}).then(function() {
  var warp = process.argv[2];

  if (!warp) {
    console.error('You must provide a warp point');
  } else {
    storage.getItem(warp, function(err, destination) {
      if (err) { throw err; }

      // the destination is simply logged so the shell script can `cd` to it
      console.log(destination);
    });
  }
}).catch(function(err) {
  console.error(err);
});
