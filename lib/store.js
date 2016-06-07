const storage = require('node-persist');

module.exports = () => {
  storage.initSync();

  return storage;
};
