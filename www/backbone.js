function models () {
/*
  window.Comment = Backbone.Model.extend({
    default: function() {
      return {
        author: "John Doe",
        text: "This is a comment !",
        id: 42
      }
    }
  })
  
  window.CommentsList = Backbone.Collection.extend({
    model: Comment
  })
*/ 
  window.Post = Backbone.Model.extend({
    default: function() {
      return {
        //comments: CommentsList,
        text: 'Dumb Post',
        liked: false,
      }
    }
  })
  
  window.PostList = Backbone.Model.extend({
    model: Post
  })
  
}

function appviews() {
  
}

$(function(){
  models()
  appview();
  
  window.App = new AppView()
})