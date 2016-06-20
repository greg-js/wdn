const path = require('path');
const storage = require('node-persist');
const table = require('text-table');

module.exports = () => {
  storage.init({
    dir: path.resolve(__dirname, '..', 'persist')
  }).then(() => {
    let output = [];

    if (storage.length() === 0) {
      console.log('No warp points have been set yet.');
      process.exit(0);
    }

    storage.forEach(key => {
      output.push([key, '=>', storage.getItem(key)]);
    });

    console.log(table(output, { align: ['r', 'l', 'l'] }));
  });
};
