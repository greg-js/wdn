const path = require('path');
const storage = require('node-persist');

storage.init({
  dir: path.resolve(__dirname, '..', 'persist')
}).then(() => {
  const warp = process.argv[2];

  if (!warp) {
    console.error('You must provide a warp point');
  } else {
    storage.getItem(warp, (err, destination) => {
      if (err) { throw err; }

      // the destination is simply logged so the shell script can `cd` to it
      console.log(destination);
    });
  }
}).catch(err => {
  console.error(err);
});
