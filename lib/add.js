const storage = require('./store')();
const access = require('fs').accessSync;
const chalk = require('chalk');

module.exports = (name, args) => {
  const destination = (args.length) ? args[0] : process.cwd();

  try {
    access(destination);

    storage.setItemSync(name, destination);
  } catch(e) {
    console.log(`${chalk.gray(destination)} is not a valid path.`)
    process.exit(1);
  }
};
