// app
define('app', [
  'app/router'
], function(Router){
  return {
    init: function(selector) {      
      return new Router(selector);
    }
  }
});
