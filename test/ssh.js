/* eslint-env mocha */
var expect = require('chai').expect;
var rm = require('fs').unlink;
var rmdir = require('fs').rmdir;
var path = require('path');

var customConfig = './test/fixtures/custom';
var sshConf = './test/fixtures/ssh-config';
var ssh = require('../lib/ssh');

// as per sshConf
var remote = 'foo';

describe('wdn ssh', function() {

  it('should fail when given a non-existing host', function() {
    expect(ssh(['nothing'], true, sshConf)).to.not.be.ok;
    expect(ssh(['some', 'dummy', 'args'], true, sshConf)).to.not.be.ok;
  });

  it('should fail when given a non-existing ssh command', function() {
    expect(ssh([remote, 'bar'], true, sshConf)).to.not.be.ok;
    expect(ssh([remote, 'baz'], true, sshConf)).to.not.be.ok;
  });

  it('should call the other methods with the remote store', function() {
    // the functionality is identical to remote points
    // and testing this better would mean a rewrite
    expect(ssh([remote, 'add', 'foo', 'bar'], true, sshConf)).to.not.be.false;
    expect(ssh([remote, 'show', 'foo'], true, sshConf)).to.not.be.false;
    expect(ssh([remote, 'remove', 'foo'], true, sshConf)).to.not.be.false;
    expect(ssh([remote, 'clear'], true, sshConf)).to.not.be.false;
    expect(ssh([remote, 'list'], true, sshConf)).to.not.be.false;
  });
});

after(function(done) {
  rm(path.resolve(customConfig, remote), function() {
    rmdir(path.resolve(customConfig), function() {
      done();
    });
  });
});
