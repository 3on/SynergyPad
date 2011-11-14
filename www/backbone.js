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

function test() {
  var post = Backbone.Model.extend({})
  var postList = Backbone.Collection.extend({
    model: post,
    localStorage: new Store("feedPeople"),
  })
  
  window.PeopleFeed = new postList()
  
  var postView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#tmpl-post').html()),
    
    events: {
      'click li.feed': 'showComments'
    },
    
    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },
    
    showComments: function() {
      alert('Comments')
    },
    
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
    
    remove: function() {
      $(this.el).remove();
    }
  })
  
  var feedView = Backbone.View.extend({
    el: $('#peopleFeed'),
    input: $('#peopleFeed .add input'),
    add: $('#peopleFeed .add'),
    
    events: {
      'keypress #peopleFeed .add input': 'createOnEnter',
      'click #peopleFeed .add button'  : 'createOnClick'
    },
    
    createOnEnter: function(e) {
      var text = this.input.val();
      if (!text || e.keyCode != 13) return;
      PeopleFeed.create({text: text});
      this.input.val('');
    },
    
    createOnClick: function(e) {
      var text = this.input.val();
      PeopleFeed.create({text: text});
      this.input.val('');
    },
    
    addOne: function(post) {
      var view = new postView({model: post});
      this.add.after(view.render().el);
    },
    
    render: function ()
    {
      $("#peopleFeed li:not(li[class=add])").remove()
      
      //$.tmpl(this.template, this.model).appendTo(this.el)
      
      return this
    },
    
    initialize: function() {
      PeopleFeed.bind('add',   this.addOne, this);
      //PeopleView.bind('reset', this.addAll, this);
      //PeopleView.bind('all',   this.render, this);
      
      this.render()
    }
    
  })
  
  var feed = new feedView()
}

$(function(){
  //models()
  //appview();
  
  //window.App = new AppView()
  
  test()
})



