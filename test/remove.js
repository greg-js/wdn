/* eslint-env mocha */
var expect = require('chai').expect;
var rm = require('fs').unlink;
var rmdir = require('fs').rmdir;
var path = require('path');

var customConfig = './test/fixtures/custom';
var remove = require('../lib/remove');
var store = require('../lib/store');

var local = 'local';

describe('wdn remove', function() {

  it('should remove points', function() {
    expect(store(local, customConfig).get('foo')).to.not.be.ok;
    store(local, customConfig).set('foo', './test');

    expect(store(local, customConfig).get('foo')).to.be.ok;

    expect(remove(local, 'foo', true, customConfig)).to.be.ok;

    expect(store(local, customConfig).get('foo')).to.not.be.ok;
  });

  it('should should not try to remove non-existing points', function() {
    expect(remove(local, 'bar', true, customConfig)).to.not.be.ok;
    expect(remove(local, 'bar', false, customConfig)).to.not.be.ok;
  });

  after(function(done) {
    rm(path.resolve(customConfig, local), function() {
      rmdir(path.resolve(customConfig), function() {
        done();
      });
    });
  });
});
