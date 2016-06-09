const prompt = require('./prompt');

const path = require('path');
const storage = require('node-persist');
const chalk = require('chalk');

module.exports = () => {

  storage.init({
    dir: path.resolve(__dirname, '..', 'persist')
  }).then(() => {

    prompt(`Are you sure you want to ${chalk.red('delete all your warp points?')} (y/N) `, input => {
      if (/^y$|^yes$/i.test(input)) {
        storage.clear().then(() => {
          console.log(chalk.gray('All warp points successfully cleared.'));
          process.exit(0);
        });
      } else {
        console.log(`${chalk.gray('clear')} command aborted.`);
        process.exit(0);
      }
    });
  });
};
