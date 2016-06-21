module.exports = function(text, callback) {
  var stdin = process.stdin;
  var stdout = process.stdout;

  stdin.resume();
  stdout.write(text);

  stdin.once('data', function(response) {
    callback(response.toString().trim());
  });
}
