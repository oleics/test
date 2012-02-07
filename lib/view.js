/*
  Module: view
  Defines the base class for all views.
 */
define('view', [
  'jquery', 'underscore', 'backbone', 'mustache', 'config'
], function($, _, Backbone, Mustache, config) {
  return Backbone.View.extend({
    /*
      Method: template
      First call loads the template-string and
      replaces the template-function with a
      function that provides the compiled
      template.
     */
    template: function(/* path || data*/) {
      var cb = arguments[1]||function(){},
          tplEl = $('#tpl-'+arguments[0]);
      if(tplEl.length === 1) {
        this.template = Mustache.compile(tplEl.html());
        cb();
      } else {
        console.warn('Loading template "'+arguments[0]+'"');
        var self = this;
        $.ajax({
          url: config.templateDirectory+arguments[0]+config.templateExtension,
          async: false,
          success: function(data) {
            self.template = Mustache.compile(data);
            cb();
          }
        });
      }
    },
    
    /*
     */
    initialize: function() {
      this.template(this.className);
    },
    
    /*
     */
    render: function(renderChildren, renderAllChildren) {
      this.el.innerHTML = this.template(this.model.toJSON());
      
      if(this.children!=null) {
        for(var key in this.children) {
          if(this.children[key].el.parentNode==null) {
            this.el.appendChild(this.children[key].el);
          }
          if(renderChildren) {
            this.children[key].render(renderAllChildren);
          }
        }
      }
    },
    
    /*
     */
    addView: function(view) {
      if(view.parent) {
        view.parent.removeView(view);
      }
      if(!this.children) {
        this.children = [];
      }
      this.children.push(view);
      view.parent = this;
    },
    
    /*
     */
    removeView: function(view) {
      if(this.children!=null) {
        var index = this.children.indexOf(view);
        if(index!==-1) {
          this.$(view.el, this.el).remove();
          this.children.splice(index, 1);
          delete view.parent;
        }
      }
    }
  });
});
