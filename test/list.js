/* eslint-env mocha */
var expect = require('chai').expect;
var rm = require('fs').unlink;
var rmdir = require('fs').rmdir;
var path = require('path');

var customConfig = './test/fixtures/custom';
var store = require('../lib/store')(customConfig);
var list = require('../lib/list');

var local = 'local';

describe('wdn list', function() {

  it('should not return anything when the store is empty', function() {
    expect(list(local, true, customConfig, true)).to.not.be.ok;
    expect(list(local, false, customConfig, true)).to.not.be.ok;
  });

  it('should log the contents of the store alphabetically when not empty', function() {
    var output;
    store(local).set('foo', './test');
    store(local).set('bar', './test');
    output = list(local, false, customConfig, true);
    expect(output).to.be.ok;
    expect(output).to.be.an('array');
    expect(output[0][1]).to.match(/bar/);
  });

  after(function(done) {
    rm(path.resolve(customConfig, local), function() {
      rmdir(path.resolve(customConfig), function() {
        done();
      });
    });
  });
});
