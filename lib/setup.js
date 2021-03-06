var fs = require('fs');
var path = require('path');
var isValidPath = require('../lib/helpers/is-valid-path');
var loadSshConfig = require('../lib/helpers/load-ssh-config');

var omelette = require('omelette');
var complete = omelette('wdn <one> <two> <three>');

var initFile = complete.getDefaultShellInitFile();

var configLoc = null;
var completeLoc = null;
var sourceText = null;
var completionText = null;

module.exports = function() {
  var store = require('../lib/store')();

  complete.on('one', function() {
    var points = store('local').points();
    complete.reply(points);
  });

  complete.on('two', function(word) {
    if (word === 'ssh') {
      loadSshConfig(function(err, hosts) {
        if (err) { throw err; }
        complete.reply(hosts);
      });
    } else if (/^e(xec)?$|^remove$|^rm$|^s(how)?$/.test(word)) {
      var points = store('local').points();
      complete.reply(points);
    } else {
      process.exit(0);
    }
  });

  complete.on('three', function(word, line) {
    var isSshing = line.split(' ')[1] === 'ssh';

    if (isSshing) {
      var points = store(word).points();
      complete.reply(points);
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
