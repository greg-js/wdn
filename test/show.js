/* eslint-env mocha */
var expect = require('chai').expect;
var rm = require('fs').unlink;
var rmdir = require('fs').rmdir;
var path = require('path');

var customConfig = './test/fixtures/custom';
var show = require('../lib/show');
var store = require('../lib/store');

var local = 'local';

// module.exports = function(scope, arg, force, config) {
describe('wdn show', function() {

  before(function() {
    store(local, customConfig).set('foo', path.resolve('bar'));
    store(local, customConfig).set('baz', path.resolve('bam'));
    store(local, customConfig).set('anotherbaz', path.resolve('bam'));
    store(local, customConfig).set('key', path.resolve('value'));
    store(local, customConfig).set('question', path.resolve('answer'));
  });

  // actual console logged values aren't explicitly tested here
  it('should show the path when given a point', function() {
    expect(show(local, 'foo', true, customConfig)).to.equal(path.resolve('bar'));
    expect(show(local, 'key', false, customConfig)).to.equal(path.resolve('value'));
  });

  it('should show a list of points when given a path', function() {
    var first = show(local, path.resolve('bar'), true, customConfig);
    var second = show(local, path.resolve('bam'), false, customConfig);
    expect(first).to.be.ok;
    expect(first).to.be.an('array');
    expect(first).to.contain('foo');
    expect(second).to.be.an('array');
    expect(second[0]).to.match(/baz/);
    expect(second[1]).to.match(/anotherbaz/);
  });

  it('shouldn\'t do anything when passed a value that\'s not a point nor a path', function() {
    expect(show(local, 'nothing', true, customConfig)).to.not.be.ok;
    expect(show(local, 'nothing', false, customConfig)).to.not.be.ok;
  });

  after(function(done) {
    rm(path.resolve(customConfig, local), function() {
      rmdir(path.resolve(customConfig), function() {
        done();
      });
    });
  });
});
