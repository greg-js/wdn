const path = require('path');
const storage = require('node-persist');
storage.initSync({
  dir: path.resolve(__dirname, '..', 'persist')
});

module.exports = () => {
  return storage;
};
