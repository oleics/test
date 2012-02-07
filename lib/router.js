// router
define('router', [
  'jquery',
  'underscore',
  'backbone',
  'models',
  'views'
], function($, _, Backbone, models, views) {
  return Backbone.Router.extend({
    routes: {
      '': 'index'
    },
    
    views: {},
    
    initialize: function(selector) {
      this.selector = selector;
      
      this.views.app = new views.App({
        model: new models.App
      });
      
      this.views.user = new views.User({
        model: new models.User
      });
      this.views.app.addView(this.views.user);
      
      $(this.selector).empty().append(this.views.app.el);
      
      Backbone.history.start();
    },
    
    index: function() {
      this.views.app.render(true, true);
    }
  });
});
