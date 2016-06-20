const prompt = require('./prompt');

const path = require('path');
const storage = require('node-persist');
const access = require('fs').access;
const chalk = require('chalk');

module.exports = (warpPoint, args) => {
  const destination = (args.length) ? args[0] : process.cwd();

  // check the path
  access(destination, inaccessible => {
    if (inaccessible) {
      console.log(`${chalk.gray(destination)} is not a valid path.`)
      process.exit(1);
    }

    // open storage
    storage.init({
      dir: path.resolve(__dirname, '..', 'persist')
    }).then(() => {

      // check if the warp point already exists
      storage.getItem(warpPoint, (err, currentValue) => {
        if (err) { throw err; }

        if (currentValue) {
          console.log(`${chalk.gray(warpPoint)} already points to ${chalk.gray(currentValue)}.`);

          prompt('Overwrite? (Y/n) ', input => {
            if (/^n$|^no$/i.test(input)) {
              console.log(`${chalk.red('add')} command aborted`);
              process.exit(0);
            } else {
              storage.setItem(warpPoint, destination).then(() => {
                console.log(`Warp point overwritten:\n\t${warpPoint}\t=>\t${destination}`);
                process.exit(0);
              });
            }
          });
        } else {
          storage.setItem(warpPoint, destination).then(() => {
            console.log(`New warp point set:\n\t${warpPoint}\t=>\t${destination}`);
            process.exit(0);
          });
        }
      });
    });
  });
};
