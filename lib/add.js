const storage = require('./store')();
const prompt = require('./prompt');

const access = require('fs').accessSync;
const chalk = require('chalk');

module.exports = (name, args) => {
  const destination = (args.length) ? args[0] : process.cwd();
  const currentValue = storage.getItemSync(name);

  try {
    access(destination);

    if (currentValue) {
      console.log(`${chalk.gray(name)} already points to ${chalk.gray(currentValue)}.`);
      prompt('Overwrite? (Y/n) ', input => {
        if (/^n$|^no$/i.test(input)) {
          process.exit(0);
        } else {
          storage.setItemSync(name, destination);
          process.exit(0);
        }
      });
    } else {
      storage.setItemSync(name, destination);
    }
  } catch(e) {
    console.log(`${chalk.gray(destination)} is not a valid path.`)
    process.exit(1);
  }
};
