const chalk = require('chalk');

const add = require('./lib/add');
const remove = require('./lib/remove');
const list = require('./lib/list');

const displayVersion = () => {
  console.log(`wdn v${chalk.gray(require('./package.json').version)}`);
}

const displayHelp = () => {
  // TODO: write help text
  console.log('help text here');
}

module.exports = (options) => {
  if (options.version) {
    displayVersion();
  } else if (options.help) {
    displayHelp();
  } else if (options.list) {
    list();
  } else if (options.add) {
    add(options.add, options.args);
  } else if (options.remove) {
    remove(options.remove);
  } else {
    console.error(chalk.red('Invalid syntax.\n'));
    displayHelp();
  }
}
