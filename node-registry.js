var _ = require('underscore');
var assert = require('assert');

module.exports = exports = (function() {
  'use strict';

  return function() {

    var _dict = {};
    var _dep = {};
    var _config = {};

    function getParam(func) {
      var fn = func.toString()
                   .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
      var params = fn.slice(fn.indexOf('(') + 1,
                            fn.indexOf(')'))
                     .match(/([^\s,]+)/g);
      return (params || []);
    } 

    return {

      configure: function(name, val) {
        var avail = ['async', 'di'];
        assert(true, _.contains(avail, name));
        _config[name] = val;
      },

      add: function(name, func, config) {
        config = (typeof config === "undefined") ? {} : config;
        assert(false, _.has(_dict, name));
        assert(true, _.isFunction(func));
        _.extend(_dict, {
          func: func,
          config: config
        });
      },

      get: function(name) {
        assert(true, _.has(_dict, name));
        return _dict[name];
      },

      invoke: function(name, op, args) {
        op = (typeof op === "undefined") ? {} : op;
        args = (typeof args === "undefined") ? [] : args;

        if (op.di) {
          assert(true, _.has(_dict, name));
          var argList = {};
          var params = getParam(_dict[name]);
          _.each(params, function(depName) {
            assert(true, _.has(merged, depName));
            argList[depName] = merged[depName]();
          });
          _dict[name].apply(null, argList);
        } else {
          assert(true, _.has(_dict, name));
          _dict[name].apply(null, args);
        }
      },

      update: function(name, func, config) {
        config = (typeof config === "undefined") ? {} : config;
        assert(true, _.has(_dict, name));
        assert(true, _.isFunction(func));
        _dict[name] = {
          func: func,
          config: config
        };
      },

      delete: function(name) {
        assert(true, _.has(_dict, name));
        delete _dict[name];
      }

    };

  };

})();