var path = require('path');
var storage = require('node-persist');

// export convenient synchronous methods to interact with the 'db'
module.exports = function(config) {
  var dir = (config) ? path.resolve(config)
    : path.resolve(process.env['HOME'], '.config', 'wdn');

  return function(scope) {
    var scopeArray = null;
    var ctx = null;

    // init
    storage.initSync({
      dir: dir
    });

    scopeArray = storage.getItemSync(scope) || '[]';

    if (scopeArray instanceof Array) {
      ctx = scopeArray
    } else {
      ctx = JSON.parse(scopeArray);
    }

    return {
      // get the pointObject for a given point
      get: function(point) {

        for (var i = 0, x = ctx.length; i < x; i++) {
          if (ctx[i].point == point) {
            return ctx[i];
          }
        }

        return null;
      },
      // set the pointObject for a given point or add it
      set: function(point, pth) {
        var changed = false;

        for (var i = 0, x = ctx.length; i < x; i++) {
          if (ctx[i].point == point) {
            ctx[i].path = pth;
            changed = true;
          }
        }

        if (!changed) {
          ctx.push({ point: point, path: pth });
        }

        storage.setItemSync(scope, JSON.stringify(ctx));
      },
      // remove a pointObject for a given point
      remove: function(point) {

        var objToRemove = this.get(point);
        var newCtx = ctx.slice(0, ctx.indexOf(objToRemove))
                        .concat(ctx.slice(ctx.indexOf(objToRemove) + 1));

        storage.setItemSync(scope, JSON.stringify(newCtx));
      },
      length: ctx.length,
      // iterator
      forEach: function(cb) {
        ctx.forEach(function(item) {
          cb(item);
        });
      },
      // clear the scope by setting it to an empty object
      clear: function() {
        storage.setItemSync(scope, []);
      },
      points: function() {
        return ctx.map(function(pointObject) { return pointObject.point });
      },
      paths: function() {
        return ctx.map(function(pointObject) { return pointObject.path });
      }
    };

  }

};
