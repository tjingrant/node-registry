var _ = require('underscore');
var assert = require('assert');

module.exports = exports = (function() {
  'use strict';

  return function() {

    var _dict = {};
    var _dep = {};

    function getParam(func) {
      var fn = func.toString()
                   .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
      var params = fn.slice(fn.indexOf('(') + 1,
                            fn.indexOf(')'))
                     .match(/([^\s,]+)/g);
      return (params || []);
    } 

    return {

      set: function(name, func) {
        _dict = func;
      },  

      get: function(name) {
        return _dict[name];
      },

      invoke: function(name, op, args, dep) {
        if (op.di) {
          assert.deepEqual([], args);
          var merged = _.merge(_dep, dep);
          var argList = {};
          _.each(merged, function(val, name) {
            assert(true, _.has(merged, name));
            argList[name] = merged[name]();
          });
          _dict[name].apply(null, argList);
        } else {
          _dict[name].apply(null, args);
        }
      },

      update: function(name, func) {
        _dict[name] = func;
      },

      delete: function(name) {
        delete _dict[name];
      }

    };

  };

})();