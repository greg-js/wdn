/* eslint-env mocha */
var expect = require('chai').expect;
var rm = require('fs').unlink;
var rmdir = require('fs').rmdir;
var path = require('path');
var stdin = require('bdd-stdin');

var customConfig = './test/fixtures/custom';
var remove = require('../lib/remove');
var store = require('../lib/store')(customConfig);

var local = 'local';

describe('wdn remove', function() {
  var localStore = store(local);

  it('should remove points (force)', function() {
    expect(store(local).get('foo')).to.not.be.ok;
    localStore.set('foo', './test');

    expect(store(local).get('foo')).to.be.ok;

    expect(remove(local, 'foo', true, customConfig)).to.be.ok;

    expect(store(local).get('foo')).to.not.be.ok;
  });

  it('should remove points with y-response', function() {
    expect(store(local).get('foo')).to.not.be.ok;
    localStore.set('foo', './test');

    expect(store(local).get('foo')).to.be.ok;

    stdin('y');
    return remove(local, 'foo', false, customConfig)
      .then(function(res) {
        expect(store(local).get('foo')).to.not.be.ok;
        expect(res).to.be.true;
      });
  });

  it('should not remove points with n-response', function() {
    expect(store(local).get('foo')).to.not.be.ok;
    localStore.set('foo', './test');

    expect(store(local).get('foo')).to.be.ok;

    stdin('n');
    return remove(local, 'foo', false, customConfig)
      .then(function(res) {
        expect(store(local).get('foo')).to.be.ok;
        expect(res).to.be.false;
      });
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
