var chalk = require('chalk');
var table = require('text-table');

var add = require('./lib/add');
var remove = require('./lib/remove');
var clear = require('./lib/clear');
var list = require('./lib/list');
var show = require('./lib/show');
var clean = require('./lib/clean');

var displayVersion = function() {
  console.log('wdn v' + chalk.gray(require('./package.json').version));
};

var displayHelp = function() {
  console.log('Usage: wdn [command] <point>\n\nCommands:')
  console.log(table([
    ['add <point> [dir]', 'Adds a given dir or the current working dir to your warp points (alias: a)'],
    ['clean', 'Removes all warp points with broken paths (alias: x)'],
    ['clear', 'Deletes all currently stored warp points (alias: rm-all, remove-all)'],
    ['exec <point> <command>', 'Execute arbitrary command (alias: e)'],
    ['help', 'Prints this help message (alias: h)'],
    ['list', 'Prints all currently stored warp points to the console (alias: ls)'],
    ['remove <point>', 'Removes a given warp point (alias: rm)'],
    ['show [point/dir]', 'Shows the path for a point or all points for a path or the current dir (alias: s)'],
    ['version', 'Prints the current version (alias: v)']
  ]));
  console.log('\nwdn <point> to warp to a given point');
  console.log('\n-f/--force option suppresses output & prompt. With `show` and `list`, it outputs unformatted paths');
  console.log('\nFull readme on GitHub: https://github.com/greg-js/wdn');
};

module.exports = function(options) {
  // local is the default scope
  // in the upcoming ssh() function, the functions may be called with
  // different (remote hosts) scopes
  var local = 'local';

  if (options.version) {
    displayVersion();
  } else if (options.help) {
    displayHelp();
  } else if (options.list) {
    list(local, options.force);
  } else if (options.clear) {
    clear(local, options.force);
  } else if (options.clean) {
    clean(local, options.force);
  } else if (options.remove) {
    remove(local, options.remove, options.force);
  } else if (options.show) {
    show(local, options.show, options.force);
  } else if (options.add) {
    add(local, options.add, options.args, options.force);
  } else {
    console.error('Invalid syntax.\n');
    displayHelp();
  }
}
