var path = require('path');

var word = process.argv[2];
var scope = process.argv[3] || 'local';
var config = (process.argv[4]) ? path.resolve(process.argv[4]) : null;

autocomplete(word, scope, config);

function autocomplete(word, scope, config) {
  var store = require('./store')(scope, config);
  var commands = null;
  var output = null;
  if (scope === 'local') {
    commands = [ 'add', 'clean', 'clear', 'exec', 'help', 'list', 'remove',
                 'show', 'ssh', 'version'];
  } else {
    commands = [ 'add', 'clear', 'list', 'remove', 'show' ];
  }
  output = store.points().concat(commands);
  process.stdout.write(output.join('\n'));
}

module.exports = autocomplete;
