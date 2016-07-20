/* eslint-env mocha */
var expect = require('chai').expect;
var rm = require('fs').unlink;
var rmdir = require('fs').rmdir;
var path = require('path');

var customDir = path.resolve('./test/fixtures/custom');
var sshConf = path.resolve('./test/fixtures/ssh-config');
var ssh = require('../lib/ssh');

// as per sshConf
var remote = 'foo';

describe('wdn ssh', function() {

  it('should fail when given a non-existing host', function() {
    expect(ssh(['nothing'], true, sshConf)).to.not.be.ok;
    expect(ssh(['some', 'dummy', 'args'], false, sshConf)).to.not.be.ok;
  });

  it('should fail when given a non-existing ssh command', function() {
    expect(ssh.bind(null, [remote, 'bar'], true, customDir, sshConf))
      .to.throw(/recognized/);
    expect(ssh.bind(null, [remote, 'baz'], true, customDir, sshConf))
      .to.throw(/recognized/);
    expect(ssh.bind(null, [remote, 'bam'], false, customDir, sshConf))
      .to.throw(/recognized/);
  });

  it('should call the other methods with the remote store', function() {
    ssh([remote, 'add', 'foo', 'bar'], true, customDir, sshConf);
    expect(ssh([remote, 'list'], true, customDir, sshConf)).to.not.be.false;
    expect(ssh([remote, 'show', 'foo'], true, customDir, sshConf))
      .to.equal('bar');
    expect(ssh([remote, 'remove', 'foo'], true, customDir, sshConf))
      .to.not.be.false;
    ssh([remote, 'add', 'foo', 'bar'], true, customDir, sshConf);
    expect(ssh([remote, 'clear'], true, customDir, sshConf)).to.not.be.false;
    expect(ssh([remote, 'show', 'foo'], true, customDir, sshConf)).to.not.be.ok;
    expect(ssh([remote, 'list'], true, customDir, sshConf)).to.be.false;
  });
});

after(function(done) {
  rm(path.resolve(customDir, remote), function() {
    rmdir(path.resolve(customDir), function() {
      done();
    });
  });
});
