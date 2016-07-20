/* eslint-env mocha */
var expect = require('chai').expect;
var path = require('path');
var Promise = require('bluebird');

describe('helper functions >', function() {
  describe('is-valid-path >', function() {

    var isValidPath = require('../lib/helpers/is-valid-path');

    it('should detect valid paths', function() {
      expect(isValidPath(process.cwd())).to.be.true;
      expect(isValidPath(path.resolve(process.cwd(), '..'))).to.be.true;
    });

    it('should detect invalid paths', function() {
      expect(isValidPath('/this/cant/possibly/be/valid')).to.be.false;
      expect(isValidPath('neither/can/this')).to.be.false;
    });
  });

  describe('load-ssh-config >', function() {

    var loadSshConfig = require('../lib/helpers/load-ssh-config');
    var customSshConfig = './test/fixtures/ssh-config';
    var customSystemSshConfig = './test/fixtures/system-ssh-config';

    it('should load the local ssh config', function(done) {
      loadSshConfig(function(err, hosts) {
        expect(hosts).to.be.an('array');
        done();
      });
    });

    it('should load & parse a custom ssh config', function(done) {
      loadSshConfig(function(err, hosts) {
        expect(hosts).to.be.an('array');
        expect(hosts.length).to.equal(2);
        expect(hosts[0]).to.equal('foo');
        loadSshConfig(function(err, hosts2) {
          expect(hosts2).to.be.an('array');
          expect(hosts2.length).to.equal(1);
          done();
        }, customSystemSshConfig);
      }, customSshConfig);
    });

    it('should error out when given invalid paths', function(done) {
      loadSshConfig(function(err) {
        expect(err).to.be.an('error');
        done();
      }, 'invalid/path', 'another/one');
    });

    it('should fall back to the user dir'
       + ' if the system one is invalid', function(done) {
      loadSshConfig(function(err, hosts) {
        expect(err).to.not.be.ok;
        expect(hosts).to.be.an('array');
        expect(hosts.length).to.equal(2);
        done();
      }, customSshConfig, 'invalid/path');
    });

    it('should fall back to the system dir'
       + ' if the user one is invalid', function(done) {
      loadSshConfig(function(err, hosts) {
        expect(err).to.not.be.ok;
        expect(hosts).to.be.an('array');
        expect(hosts.length).to.equal(1);
        done();
      }, 'invalid/path', customSystemSshConfig );
    });
  });

  describe('prompt >', function() {

    var prompt = require('../lib/helpers/prompt');

    it('should return a promise', function() {
      var prmpt = prompt('foo');
      expect(prmpt).to.be.an.instanceof(Promise);
    });
  });

  describe('is-testing >', function() {

    var isTesting = require('../lib/helpers/is-testing');

    it('should return true when testing', function() {
      expect(isTesting()).to.be.true;
    });
  });
});
