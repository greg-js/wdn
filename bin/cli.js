#!/usr/bin/env node

var wdn = require('../');
var minimist = require('minimist');
var defaults = {
  boolean: [
    'help',
    'version',
    'list',
    'clear',
    'clean',
    'force',
    'ssh'
  ],
  alias: {
    h: 'help',
    v: 'version',
    ls: 'list',
    a: 'add',
    rm: 'remove',
    'rm-all': 'clear',
    'remove-all': 'clear',
    s: 'show',
    x: 'clean',
    f: 'force'
  },
  default: {
    help: false,
    version: false,
    list: false,
    clear: false,
    clean: false,
    force: false,
    add: null,
    remove: null,
    show: null,
    ssh: false
  }
};

var keywords = [ 'help', 'h', 'version', 'v', 'list', 'ls', 'add',
                 'a', 'remove', 'rm', 'clear', 'rm-all', 'remove-all',
                 'show', 's', 'clean', 'x', 'ssh' ];

var options = minimist(process.argv.slice(2), defaults);
var firstArg = (options._.length) ? options._[0] : null;

// allow cli options without leading dash and rebuild options
if (keywords.indexOf(firstArg) !== -1) {
  if (/^help$|^h$/.test(firstArg)) {
    options.help = options.h = true;
    options._ = options._.slice(1);
  } else if (/^version|^v$/.test(firstArg)) {
    options.version = options.v = true;
    options._ = options._.slice(1);
  } else if (/^list|^ls$/.test(firstArg)) {
    options.list = options.ls = true;
    options._ = options._.slice(1);
  } else if (/^clear$|^rm\-all$|^remove\-all$/.test(firstArg)) {
    options.clear = true;
    options._ = options._.slice(1);
  } else if (/^clean$|^x$/.test(firstArg)) {
    options.clean = true;
    options._ = options._.slice(1);
  } else if (/^show$|^s$/.test(firstArg)) {
    options.show = options.s = options._[1] || process.cwd();
    options._ = options._.slice(2);
  } else if (/^add$|^a$/.test(firstArg)) {
    options.add = options.a = options._[1];
    options._ = options._.slice(2);
  } else if (/^remove$|^rm$/.test(firstArg)) {
    options.remove = options.rm = options._[1];
    options._ = options._.slice(2);
  } else if (/^ssh$/.test(firstArg)) {
    options.ssh = true;
    options._ = options._.slice(1);
  }
}

wdn({
  args: options._,
  help: options.help,
  version: options.version,
  list: options.list,
  clear: options.clear,
  add: options.add,
  remove: options.remove,
  show: options.show,
  clean: options.clean,
  force: options.force,
  ssh: options.ssh
});
