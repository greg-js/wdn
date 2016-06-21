#!/usr/bin/env node

var wdn = require('../');
var minimist = require('minimist');
var defaults = {
  boolean: [
    'help',
    'version',
    'list',
    'clear'
  ],
  alias: {
    h: 'help',
    v: 'version',
    ls: 'list',
    a: 'add',
    rm: 'remove'
  },
  default: {
    help: false,
    version: false,
    list: false,
    clear: false,
    add: null,
    remove: null
  }
};

var keywords = ['help', 'h', 'version', 'v', 'list', 'ls', 'add', 'a', 'remove', 'rm', 'clear'];

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
  } else if (/^clear$/.test(firstArg)) {
    options.clear = true;
    options._ = options._.slice(1);
  } else if (/^add$|^a$/.test(firstArg)) {
    options.add = options.a = options._[1];
    options._ = options._.slice(2);
  } else if (/^remove$|^rm$/.test(firstArg)){
    options.remove = options.rm = options._[1];
    options._ = options._.slice(2);
  }
}

wdn({
  args: options._,
  help: options.help,
  version: options.version,
  list: options.list,
  clear: options.clear,
  add: options.add,
  remove: options.remove
});
