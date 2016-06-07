const storage = require('./store')();

const warp = process.argv[2];
const destination = storage.getItemSync(warp);

console.log(destination);
