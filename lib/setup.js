var fs = require('fs');
var path = require('path');
var isValidPath = require('../lib/helpers/is-valid-path');
var loadSshConfig = require('../lib/helpers/load-ssh-config');

var omelette = require('omelette');
var complete = omelette('wdn <one> <two> <three>');

var initFile = complete.getDefaultShellInitFile();
var isZsh = /zsh/.test(initFile);

var configLoc = null;
var completeLoc = null;
var sourceText = null;
var completionText = null;

module.exports = function() {
  var store = require('../lib/store');

  complete.on('one', function() {
    var points = store('local').points();
    complete.reply(
      [ 'add', 'clean', 'clear', 'exec', 'help', 'show', 'ssh', 'version' ]
      .concat(points)
    );
  });

  complete.on('two', function() {
    var last = process.argv[process.argv.length - 1];
    var lastButOne = process.argv[process.argv.length - 2];

    if ([last, lastButOne].indexOf('ssh') !== -1) {
      loadSshConfig(function(err, hosts) {
        if (err) { throw err; }
        complete.reply(hosts);
      });
    } else {
      var points = store('local').points();
      complete.reply(points);
    }
  });

  complete.on('three', function() {
    var lastArg, last, lastButOne, lastButTwo;

    if (isZsh) {
      lastArg = process.argv[process.argv.length - 1].split(' ');
      last = lastArg[lastArg.length - 1];
      lastButOne = lastArg[lastArg.length - 2];
      lastButTwo = lastArg[lastArg.length - 3];
    } else {
      last = process.argv[process.argv.length - 1];
      lastButOne = process.argv[process.argv.length - 2];
      lastButTwo = process.argv[process.argv.length - 3];
    }

    if ([lastButOne, lastButTwo].indexOf('ssh') !== -1) {
      var points = (store(last).points().length) ? store(last).points() :
        store(lastButOne).points();
      complete.reply(
        [ 'add', 'clear', 'list', 'remove', 'show' ]
        .concat(points)
      );
    }
  });

  complete.init();

  if (process.argv.indexOf('--setup') !== -1) {
    sourceText = [
      '',
      '# begin wdn setup',
      'wdn() {',
      '\tsource $(npm root -g)/wdn/bin/wdn.sh',
      '}'
    ];

    if (/bash/.test(initFile)) {
      configLoc = path.resolve(process.env.HOME, '.config', 'wdn');
      completeLoc = path.resolve(configLoc, '.autocomplete');
      if (!isValidPath(configLoc)) {
        fs.mkdirSync(configLoc);
      }
      completionText = [ 'source ' + completeLoc, '# end wdn setup' ];

      fs.writeFileSync(
        path.resolve(completeLoc),
        complete.generateCompletionCode()
      );

      fs.appendFileSync(initFile, sourceText.concat(completionText)
        .join('\n'));
    } else {
      completionText = [ 'source <(wdn --completion)', '# end wdn setup' ];
      fs.appendFileSync(initFile, sourceText.concat(completionText)
        .join('\n'));
    }

    console.log('wdn successfully set up. Now source your ' + initFile +
                ' or open a new shell and start warping.');
    process.exit(0);
  }
}
