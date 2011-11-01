function models () {
  window.Feed = Backbone.Model.extend({
    default: function() {
      return {
        comments: [],
        
      }
    }
  })
}

$(function(){
  models()
})