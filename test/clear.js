/* eslint-env mocha */
var expect = require('chai').expect;
var rm = require('fs').unlink;
var rmdir = require('fs').rmdir;
var path = require('path');
var stdin = require('bdd-stdin');

var customConfig = './test/fixtures/custom';
var clear = require('../lib/clear');
var store = require('../lib/store')(customConfig);

var local = 'local';

describe('wdn clear', function() {
  var localStore = store(local);

  it('should clear all points (force)', function() {
    expect(store(local).get('foo')).to.not.be.ok;
    localStore.set('foo', './test');
    localStore.set('bar', './test');
    localStore.set('baz', './test');
    localStore.set('bam', './test');

    expect(store(local).get('foo')).to.be.ok;
    clear(local, true, customConfig);

    expect(store(local).length).to.equal(0);
  });

  it('should clear all points with a y-response', function() {
    expect(store(local).get('foo')).to.not.be.ok;
    localStore.set('foo', './test');
    localStore.set('bar', './test');
    localStore.set('baz', './test');
    localStore.set('bam', './test');

    expect(store(local).get('foo')).to.be.ok;
    stdin('y');
    return clear(local, false, customConfig)
      .then(function(res) {
        expect(store(local).length).to.equal(0);
        expect(res).to.be.true;
      });
  });

  it('should not clear any points with a n-response', function() {
    expect(store(local).get('foo')).to.not.be.ok;
    localStore.set('foo', './test');
    localStore.set('bar', './test');
    localStore.set('baz', './test');
    localStore.set('bam', './test');

    expect(store(local).get('foo')).to.be.ok;
    stdin('n');
    return clear(local, false, customConfig)
      .then(function(res) {
        expect(store(local).length).to.equal(4);
        expect(res).to.be.false;
      });
  });

  after(function(done) {
    rm(path.resolve(customConfig, local), function() {
      rmdir(path.resolve(customConfig), function() {
        done();
      });
    });
  });
});
