const chalk = require('chalk');
const table = require('text-table');

const add = require('./lib/add');
const remove = require('./lib/remove');
const clear = require('./lib/clear');
const list = require('./lib/list');

const displayVersion = () => {
  console.log(`wdn v${chalk.gray(require('./package.json').version)}`);
};

const displayHelp = () => {
  console.log('Usage: wdn [command] <point>\n\nCommands:')
  console.log(table([
    ['add <point> [dir]', 'Adds a given dir or the current working dir to your warp points (shortcut: a)'],
    ['clear', 'Deletes all currently stored warp points'],
    ['exec <point> <command>', 'Execute arbitrary command (shortcut: e)'],
    ['help', 'Prints this help message (shortcut: h)'],
    ['list', 'Prints all currently stored warp points to the console (shortcut: ls)'],
    ['remove <point>', 'Removes a given warp point (shortcut: rm)'],
    ['version', 'Prints the current version']
  ]));
  console.log('\nTo warp to a given point:\nwdn <point>');
  console.log('\nFull readme on GitHub: https://github.com/greg-js/wdn');
};

module.exports = (options) => {
  if (options.version) {
    displayVersion();
  } else if (options.help) {
    displayHelp();
  } else if (options.list) {
    list();
  } else if (options.clear) {
    clear();
  } else if (options.remove) {
    remove(options.remove);
  } else if (options.add) {
    add(options.add, options.args);
  } else {
    console.error(chalk.red('Invalid syntax.\n'));
    displayHelp();
  }
}
