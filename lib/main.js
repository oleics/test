
(function(global){
  "use strict";
  
  var selector = '#main';
  
  function curlLoadError(err) {
    alert('OH SNAP: '+err.message);
  }
  function curlLoadSuccess(){
    //console.log('ok');
  }

  // bootstrap
  function bootstrap() {
    // preload vendor libs
    // make shure that load order is correct
    return curl([
      'jquery',
      'underscore',
      'mustache'
      //,'sm2'
    ], curlLoadSuccess, curlLoadError)
    .next(['backbone'], curlLoadSuccess, curlLoadError)
    ;
  }
  
  // enter application:
  bootstrap().next([
    'app'
  ], function(app) {
    app.init(selector);
  }, curlLoadError)
  ;
  
})(window);
