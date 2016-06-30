/* eslint-env mocha */
var expect = require('chai').expect;
var path = require('path');

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
        expect(hosts[0].HostName).to.equal('0.0.0.0');
        expect(hosts[0].Port).to.equal('4500');
        done();
      }, customSshConfig);
    });
  });
});
