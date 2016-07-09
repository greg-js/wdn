/* eslint-env mocha */
var expect = require('chai').expect;
var rm = require('fs').unlink;
var rmdir = require('fs').rmdir;
var cat = require('fs').readFile;
var path = require('path');

var customConfig = './test/fixtures/custom';

var local = 'local';

describe('store methods', function() {
  var store;

  it('store should be a function', function() {
    store = require('../lib/store');
    expect(store).to.be.a('function');
  });

  it('should expose store methods when initialized', function() {
    store = require('../lib/store')(local, customConfig);
    expect(store).to.be.an('object');
    expect(store.get).to.be.a('function');
    expect(store.set).to.be.a('function');
  });

  it('should have a set method for setting points', function(done) {
    var setPoint;
    store = require('../lib/store')(local, customConfig);
    expect(store.set).to.be.a('function');

    setPoint = store.set('foo', 'bar');
    // the method doesn't return anything, nor should it
    expect(setPoint).to.not.be.ok;

    cat(path.resolve(customConfig, local), 'utf8', function(err, data) {
      expect(data).to.match(/.*point.*foo.*path.*bar.*/);
      done();
    });
  });

  it('should have a get method for getting points', function() {
    var point, noPoint;
    store = require('../lib/store')(local, customConfig);
    expect(store.get).to.be.a('function');

    point = store.get('foo');
    expect(point).to.be.an('object');
    expect(point.point).to.equal('foo');
    expect(point.path).to.equal('bar');

    noPoint = store.get('no point here');
    expect(noPoint).to.not.be.ok;
  });

  it('should have a length variable', function() {
    // at this point just one variable had been added so length should be 1
    store = require('../lib/store')(local, customConfig);
    expect(store.length).to.be.a('number');
    expect(store.length).to.equal(1);
    // it won't update unless store is initialized again
    store.set('bar', 'foo');
    expect(store.length).to.equal(1);
    store = require('../lib/store')(local, customConfig);
    expect(store.length).to.equal(2);
  });

  it('should have a forEach iterator', function() {
    var arr = [];
    var cb = function(point) { arr.push(point); };
    store = require('../lib/store')(local, customConfig);

    expect(store.forEach).to.be.a('function');
    store.forEach(cb);
    expect(arr.length).to.equal(2);
    expect(arr[0].point).to.equal('foo');
  });

  it('should have a points method', function() {
    var points;
    store = require('../lib/store')(local, customConfig);
    expect(store.points).to.be.a('function');

    points = store.points();
    expect(points).to.be.an('array');
    expect(points.length).to.equal(2);
    expect(points[0]).to.equal('foo');
    expect(points[1]).to.equal('bar');
  });

  it('should have a paths method', function() {
    var paths;
    store = require('../lib/store')(local, customConfig);
    expect(store.paths).to.be.a('function');

    paths = store.paths();
    expect(paths).to.be.an('array');
    expect(paths.length).to.equal(2);
    expect(paths[0]).to.equal('bar');
    expect(paths[1]).to.equal('foo');
  });

  it('should have a clear method', function() {
    store = require('../lib/store')(local, customConfig);
    expect(store.length).to.equal(2);
    store.clear();
    store = require('../lib/store')(local, customConfig);
    expect(store.length).to.equal(0);
  });

  after(function(done) {
    rm(path.resolve(customConfig, local), function() {
      rmdir(path.resolve(customConfig), function() {
        done();
      });
    });
  });
});
