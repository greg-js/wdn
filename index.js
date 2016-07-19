var chalk = require('chalk');
var table = require('text-table');

var add = require('./lib/add');
var remove = require('./lib/remove');
var clear = require('./lib/clear');
var list = require('./lib/list');
var show = require('./lib/show');
var clean = require('./lib/clean');
var ssh = require('./lib/ssh');

var displayVersion = function() {
  console.log('wdn v' + chalk.gray(require('./package.json').version));
};

var displayHelp = function() {
  console.log('Usage: wdn [command] <point>\n\nCommands:')
  console.log(table([
    [
      'add <point> [dir]',
      'Add a new warp point'
    ],
    [
      'clean',
      'Remove warp points with broken paths'
    ],
    [
      'clear',
      'Delete all warp points'
    ],
    [
      'exec <point> <command>',
      'Execute arbitrary command at warp point'
    ],
    [
      'help',
      'Print this help message'
    ],
    [
      'list',
      'Print all warp points to the console'
    ],
    [
      'remove <point>',
      'Remove a warp point'
    ],
    [
      'show [point/path]',
      'Show a point\'s path or a path\'s point(s)'
    ],
    [
      'ssh <host> [command] <point>',
      'Warp to and manage remote warp points.'
    ],
    [
      'version',
      'Print the current version'
    ]
  ]));
  console.log('\nwdn <point> to warp to a local warp point');
  console.log('wdn ssh <host> <point> to warp to a remote warp point');
  console.log('-f/--force suppresses or reformats prompts and output');
  console.log('wdn --setup to install wdn shell function and autocomplete');
  console.log('\nFull readme on GitHub: https://github.com/greg-js/wdn');
};

module.exports = function(options) {
  // local is the default scope, alternate scopes are called from `ssh()`
  var local = 'local';

  if (options.version) {
    displayVersion();
  } else if (options.help) {
    displayHelp();
  } else if (options.list) {
    list(local, options.force, options.config);
  } else if (options.clear) {
    clear(local, options.force, options.config);
  } else if (options.clean) {
    clean(local, options.force, options.config);
  } else if (options.remove) {
    remove(local, options.remove, options.force, options.config);
  } else if (options.show) {
    show(local, options.show, options.force, options.config);
  } else if (options.add) {
    add(local, options.add, options.args, options.force, options.config);
  } else if (options.ssh) {
    ssh(options.args, options.force, options.config);
  } else {
    console.error('Invalid syntax.\n');
    displayHelp();
  }
};
