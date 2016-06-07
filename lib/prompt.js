module.exports = (text, callback) => {
  const stdin = process.stdin;
  const stdout = process.stdout;

  stdin.resume();
  stdout.write(text);

  stdin.once('data', response => callback(response.toString().trim()));
}
