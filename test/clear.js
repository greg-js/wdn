/* eslint-env mocha */
var expect = require('chai').expect;
var rm = require('fs').unlink;
var rmdir = require('fs').rmdir;
var path = require('path');

var customConfig = './test/fixtures/custom';
var clear = require('../lib/clear');
var store = require('../lib/store');

var local = 'local';

describe('wdn clear', function() {

  it('should clear all points', function() {
    expect(store(local, customConfig).get('foo')).to.not.be.ok;
    store(local, customConfig).set('foo', './test');
    store(local, customConfig).set('bar', './test');
    store(local, customConfig).set('baz', './test');
    store(local, customConfig).set('bam', './test');

    expect(store(local, customConfig).get('foo')).to.be.ok;
    clear(local, true, customConfig);

    expect(store(local, customConfig).length).to.equal(0);
  });

  after(function(done) {
    rm(path.resolve(customConfig, local), function() {
      rmdir(path.resolve(customConfig), function() {
        done();
      });
    });
  });
});
