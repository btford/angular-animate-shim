
angular.module('btford.animate-shim', []).
provider('$$asyncCallback', [function $$AsyncCallbackProvider() {
  'use strict';

  this.$get = ['$timeout', function($timeout) {
    return function(fn) {
        return $timeout(fn, 0, false);
    };
  }];

}]).
provider('$animate', ['$provide', function($provide) {
  'use strict';

  // based on this lil file over here:
  // https://github.com/angular/angular.js/blob/5a568b4f960cc5381b3911e3a6423aff2ff7f7f9/src/ng/animate.js

  this.$$selectors = {};

  this.register = function(name, factory) {
    var key = name + '-animation';
    if (name && name.charAt(0) != '.') throw $animateMinErr('notcsel',
        "Expecting class selector starting with '.' got '{0}'.", name);
    this.$$selectors[name.substr(1)] = key;
    $provide.factory(key, factory);
  };

  this.classNameFilter = function(expression) {
    if(arguments.length === 1) {
      this.$$classNameFilter = (expression instanceof RegExp) ? expression : null;
    }
    return this.$$classNameFilter;
  };

  this.$get = ['$timeout', '$$asyncCallback', function($timeout, $$asyncCallback) {

    function async(fn) {
      fn && $$asyncCallback(fn);
    }

    return {
      enter : function(element, parent, after, done) {
        after
            ? after.after(element)
            : parent.prepend(element);
        async(done);
      },

      leave : function(element, done) {
        element.remove();
        async(done);
      },

      removeClass : function(element, className, done) {
        className = isString(className) ?
                      className :
                      isArray(className) ? className.join(' ') : '';
        forEach(element, function (element) {
          jqLiteRemoveClass(element, className);
        });
        async(done);
      },

      setClass : function(element, add, remove, done) {
        forEach(element, function (element) {
          jqLiteAddClass(element, add);
          jqLiteRemoveClass(element, remove);
        });
        async(done);
      },

      enabled : angular.noop
    };
  }];
}]);
