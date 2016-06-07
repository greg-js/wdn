#!/usr/bin/env node

const wdn = require('../');
const minimist = require('minimist');
const defaults = {
  boolean: [
    'help',
    'version',
    'list'
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
    add: null,
    remove: null
  }
};
const keywords = ['help', 'h', 'version', 'v', 'list', 'ls', 'add', 'a', 'remove', 'rm'];

let options = minimist(process.argv.slice(2), defaults);
const firstArg = (options._.length) ? options._[0] : null;

// allow cli options without leading dash and rebuild options
if (keywords.includes(firstArg)) {
  if (/^help$|^h$/.test(firstArg)) {
    options.help = options.h = true;
  } else if (/^version|^v$/.test(firstArg)) {
    options.version = options.v = true;
  } else if (/^list|^ls$/.test(firstArg)) {
    options.list = options.ls = true;
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
  add: options.add,
  remove: options.remove
});
