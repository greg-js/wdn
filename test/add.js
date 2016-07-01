/* eslint-env mocha */
var expect = require('chai').expect;
var rm = require('fs').unlink;
var rmdir = require('fs').rmdir;
var path = require('path');

var customConfig = './test/fixtures/custom';
var add = require('../lib/add');
var store = require('../lib/store');

var local = 'local';

describe('wdn add', function() {

  it('should add a normal point', function() {
    var foo;
    expect(store(local, customConfig).get('foo')).to.not.be.ok;
    expect(add(local, 'foo', ['./test'], true, customConfig)).to.be.ok;

    foo = store(local, customConfig).get('foo');
    expect(foo).to.be.ok;
    expect(foo.point).to.equal('foo');
    expect(foo.path).to.equal(path.resolve(process.cwd(), 'test'));
  });

  it('should overwrite points', function() {
    var foo;
    expect(add(local, 'foo', ['./docs'], true, customConfig)).to.be.ok;

    foo = store(local, customConfig).get('foo');
    expect(foo).to.be.ok;
    expect(foo.point).to.equal('foo');
    expect(foo.path).to.equal(path.resolve(process.cwd(), 'docs'));
  });

  it('should not accept points with invalid paths', function() {
    var foo;
    expect(add(local, 'bar', ['./not/a/valid/path'], true, customConfig)).to.not.be.ok;

    foo = store(local, customConfig).get('bar');
    expect(foo).to.be.not.be.ok;
  });

  after(function(done) {
    rm(path.resolve(customConfig, local), function() {
      rmdir(path.resolve(customConfig), function() {
        done();
      });
    });
  });
});
