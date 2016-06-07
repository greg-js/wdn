const storage = require('node-persist');

module.exports = () => {
  storage.initSync({
    logging: true
  });

  return storage;
};
