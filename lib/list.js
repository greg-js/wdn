const storage = require('./store')();

module.exports = () => {
  if (storage.keys === 0) {
    console.log('No warp points have been set yet');
    process.exit(0);
  }

  return storage.forEach(key => {
    console.log(`${key}\t=>\t${storage.getItem(key)}`)
  });
};
