/* eslint-env mocha */
var expect = require('chai').expect;
var rm = require('fs').unlink;
var rmdir = require('fs').rmdir;
var path = require('path');

var customConfig = './test/fixtures/custom';

var warp = require('../lib/warp');
var store = require('../lib/store')(customConfig);

var local = 'local';
var remote = 'remote';

// warping works by console.logging a path or message
// which then gets read by a bash script (`./bin/wdn.sh`)
describe('warp', function() {
  var localStore, remoteStore;

  before(function() {
    localStore = store(local);
    localStore.set('wdn', process.cwd());
    localStore.set('lib', path.resolve('lib'));
    localStore.set('test', path.resolve('test'));
    localStore.set('foo', '/not/a/real/path');

    remoteStore = store(remote);
    remoteStore.set('Jerry', 'Seinfeld');
    remoteStore.set('Elaine', 'Benes');
    remoteStore.set('George', 'Costanza');
    remoteStore.set('Cosmo', 'Kramer');
  });

  it('should log an error message and return false'
     + ' if no point is given', function() {
    expect(warp(local)).to.be.false;
  });

  it('should log null if the point doesn\'t exist in the store', function() {
    expect(warp(local, 'not a point', customConfig)).to.be.a('null');
    expect(warp(remote, 'not a point', customConfig)).to.be.a('null');
  });

  it('should log the path for an existing local point', function() {
    expect(warp(local, 'lib', customConfig)).to.equal(path.resolve('lib'));
    expect(warp(local, 'test', customConfig)).to.equal(path.resolve('test'));
  });

  it('should log relative paths for existing local points', function() {
    expect(warp(local, 'wdn/lib', customConfig)).to.equal(path.resolve('lib'));
    expect(warp(local, 'wdn\\test', customConfig))
      .to.equal(path.resolve('test'));
  });

  it('should log inaccessible for an'
     + ' inaccessible local point path', function() {
    expect(warp(local, 'foo', customConfig)).to.equal('inaccessible');
    expect(warp(local, 'wdn/foo/bar', customConfig)).to.equal('inaccessible');
  });

  it('should log a remote destination without validating the path', function() {
    expect(warp(remote, 'Jerry', customConfig)).to.equal('Seinfeld');
    expect(warp(remote, 'Elaine/George/Kramer', customConfig))
      .to.equal('Benes/George/Kramer');
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
