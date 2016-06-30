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
    [ 'add <point> [dir]',
      'Adds a given dir or the current working dir to your warp points (alias: a)'
    ],
    [ 'clean',
      'Removes all warp points with broken paths (alias: x)'
    ],
    [ 'clear',
      'Deletes all currently stored warp points (alias: rm-all, remove-all)'
    ],
    [ 'exec <point> <command>',
      'Execute arbitrary command (alias: e)'
    ],
    [ 'help',
      'Prints this help message (alias: h)'
    ],
    [ 'list',
      'Prints all currently stored warp points to the console (alias: ls)'
    ],
    [ 'remove <point>',
      'Removes a given warp point (alias: rm)'
    ],
    [ 'show [point/path]',
      'Shows the path for a point or all points for a path or the current dir (alias: s)'
    ],
    [ 'ssh <host> [add/clear/list/remove/show] <point>',
      'Warps to and manages remote warp points.'
    ],
    [ 'version',
      'Prints the current version (alias: v)'
    ]
  ]));
  console.log('\nwdn <point> to warp to a local warp point');
  console.log('wdn ssh <host> <point> to warp to a remote warp point.')
  console.log('-f/--force option suppresses prompts and reformats or suppresses output');
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
