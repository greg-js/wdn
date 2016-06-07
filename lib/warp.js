const storage = require('./store')();

const warp = process.argv[2];

if (!warp) {
  console.error('You must provide a warp point');
} else {
  const destination = storage.getItemSync(warp);

  // the destination is simply logged so the shell script can `cd` to it
  console.log(destination);
}
