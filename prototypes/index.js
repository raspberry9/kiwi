/*!
 * kiwi server global prototypes
 * Copyright(c) 2015 Jaseung Koo
 * MIT Licensed
 */

"use strict";

(function(){
  /*---------------------------------------------------------------------------
   * String.format
   * usage
   *   "name is {name}".format({name:'koo'})
   *   "my score is {0}. and your score is {1}".format(100, 50)
   * ------------------------------------------------------------------------*/
  if (!String.prototype.format) {
    String.prototype.format = function() {
      var args;
      args = arguments;
      if (args.length === 1 && args[0] !== null && typeof args[0] === 'object') {
        args = args[0];
      }
      return this.replace(/{([^}]*)}/g, function(match, key) {
        return (typeof args[key] !== "undefined" ? args[key] : match);
      });
    };
  }
})();