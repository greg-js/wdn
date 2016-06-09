const prompt = require('./prompt');

const path = require('path');
const storage = require('node-persist');
const chalk = require('chalk');

module.exports = (warpPoint) => {

  storage.init({
    dir: path.resolve(__dirname, '..', 'persist')
  }).then(() => {

    // check if the warp point already exists
    storage.getItem(warpPoint, (err, currentValue) => {
      if (err) { throw err; }

      if (currentValue) {
        console.log(`${chalk.gray(warpPoint)} currently points to ${chalk.gray(currentValue)}.`);

        prompt('Remove? (Y/n) ', input => {
          if (/^n$|^no$/i.test(input)) {
            console.log(`${chalk.red('remove')} command aborted.`)
            process.exit(0);
          } else {
            storage.removeItem(warpPoint).then(() => {
              console.log(`The ${chalk.gray(warpPoint)} warp point has been deleted.`);
              process.exit(0);
            });
          }
        });
      } else {
        console.log(`${chalk.gray(warpPoint)} is not a valid warp point.`)
        process.exit(0);
      }
    });
  });
};
