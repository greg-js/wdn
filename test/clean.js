/* eslint-env mocha */
var expect = require('chai').expect;
var rm = require('fs').unlink;
var rmdir = require('fs').rmdir;
var path = require('path');

var customConfig = './test/fixtures/custom';
var clean = require('../lib/clean');
var store = require('../lib/store');

var local = 'local';

// module.exports = function(scope, force, config) {
describe('wdn clean', function() {

  before(function() {
    store(local, customConfig).set('foo', './');
    store(local, customConfig).set('bar', './');
  });

  it('shouldn\'t do anything when all points have valid paths', function() {
    expect(clean(local, true, customConfig)).to.be.ok;
    expect(store(local, customConfig).length).to.equal(2);
  });

  it('should remove points with invalid paths', function() {
    store(local, customConfig).set('baz', '/not/valid');
    expect(clean(local, true, customConfig)).to.be.ok;
    expect(store(local, customConfig).length).to.equal(2);
    expect(store(local, customConfig).points()).to.not.include('baz');
  });

  after(function(done) {
    rm(path.resolve(customConfig, local), function() {
      rmdir(path.resolve(customConfig), function() {
        done();
      });
    });
  });
});
