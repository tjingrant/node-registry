module.exports = exports = (function() {

  return function() {

    var _dict = {};

    this.set = function(name, func) {
      _dict = func;
    };

    this.get = function(name) {
      return _dict[name];
    };

    this.update = function(name, func) {
      _dict[name] = func;
    };

    this.delete = function(name) {
      delete _dict[name];
    };

  };

})();