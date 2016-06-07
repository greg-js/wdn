const path = require('path');
const storage = require('node-persist');

module.exports = () => {
  storage.init({
    dir: path.resolve(__dirname, '..', 'persist')
  }).then(() => {
    if (storage.length() === 0) {
      console.log('No warp points have been set yet.');
      process.exit(0);
    }

    return storage.forEach(key => {
      console.log(`${key}\t=>\t${storage.getItem(key)}`)
    });
  });
};
