const storage = require('./store')();

const warp = process.argv[2];

if (!warp) {
  console.error('You must provide a warp point');
} else {
  const destination = storage.getItemSync(warp);

  console.log(destination);
}
