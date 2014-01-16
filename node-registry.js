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

    this.set = function(name, func) {
      _dict = func;
    };

    this.get = function(name) {
      return _dict[name];
    };

    this.invoke = function(name, op, args, dep) {

      if (op.di) {
        assert.equal({}, args);
        var merged = _merge(_dep, dep);

      } else {
        _dict[name].apply(null, args);
      }

    }

    this.update = function(name, func) {
      _dict[name] = func;
    };

    this.delete = function(name) {
      delete _dict[name];
    };

  };

})();