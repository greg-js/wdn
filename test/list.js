/* eslint-env mocha */
var expect = require('chai').expect;
var rm = require('fs').unlink;
var rmdir = require('fs').rmdir;
var path = require('path');

var customConfig = './test/fixtures/custom';
var add = require('../lib/add');
var list = require('../lib/list');

var local = 'local';

describe('wdn list', function() {

  it('should not return anything when the store is empty', function() {
    expect(list(local, true, customConfig, true)).to.not.be.ok;
  });

  it('should get past the logging function when store is not empty', function() {
    add(local, 'foo', ['./test'], true, customConfig);
    expect(list(local, true, customConfig, true)).to.be.ok;
  });

  after(function(done) {
    rm(path.resolve(customConfig, local), function() {
      rmdir(path.resolve(customConfig), function() {
        done();
      });
    });
  });
});
