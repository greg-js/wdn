/* eslint-env mocha */
var expect = require('chai').expect;
var rm = require('fs').unlink;
var rmdir = require('fs').rmdir;
var path = require('path');
var stdin = require('bdd-stdin');

var customConfig = './test/fixtures/custom';
var add = require('../lib/add');
var store = require('../lib/store');

var local = 'local';
// as per sshConf
var remote = 'foo';

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

  it('should default to the current path', function() {
    var bar;
    expect(store(local, customConfig).get('bar')).to.not.be.ok;
    expect(add(local, 'bar', [], false, customConfig)).to.be.ok;

    bar = store(local, customConfig).get('bar');
    expect(bar).to.be.ok;
    expect(bar.point).to.equal('bar');
    expect(bar.path).to.equal(process.cwd());
  });

  it('should add a remote point', function() {
    var foo;
    expect(store(remote, customConfig).get('foo')).to.not.be.ok;
    expect(add(remote, 'foo', 'test', true, customConfig)).to.be.ok;

    foo = store(remote, customConfig).get('foo');
    expect(foo).to.be.ok;
    expect(foo.point).to.equal('foo');
    expect(foo.path).to.equal('test');
  });

  it('should overwrite points (force)', function() {
    var foo;
    expect(add(local, 'foo', ['./docs'], true, customConfig)).to.be.ok;

    foo = store(local, customConfig).get('foo');
    expect(foo).to.be.ok;
    expect(foo.point).to.equal('foo');
    expect(foo.path).to.equal(path.resolve(process.cwd(), 'docs'));
  });

  it('should overwrite points with y-response', function() {
    stdin('y');
    return add(local, 'foo', ['./'], false, customConfig)
      .then(function(res) {
        expect(res.point).to.equal('foo');
        expect(res.path).to.equal(path.resolve(process.cwd()));
      });
  });

  it('should not overwrite points with n-response', function() {
    stdin('n');
    return add(local, 'foo', ['./'], false, customConfig)
      .then(function(res) {
        expect(res.point).to.not.be.ok;
      });
  });

  it('should not accept points with invalid paths', function() {
    var baz, bam;
    expect(add(local, 'baz', ['./not/a/valid/path'], true, customConfig)).to.not.be.ok;
    expect(add(local, 'bam', ['./not/a/valid/path'], false, customConfig)).to.not.be.ok;

    baz = store(local, customConfig).get('baz');
    bam = store(local, customConfig).get('bam');
    expect(baz).to.not.be.ok;
    expect(bam).to.not.be.ok;
  });

  after(function(done) {
    rm(path.resolve(customConfig, local), function() {
      rm(path.resolve(customConfig, remote), function() {
        rmdir(path.resolve(customConfig), function() {
          done();
        });
      });
    });
  });
});
