function init() {
    window.People = {}
    window.People.comment = Backbone.Model.extend({})
    window.People.commentList = Backbone.Collection.extend({
          model: window.People.comment
        })
    window.People.post = Backbone.Model.extend({
      default: function() {
        return {comments: new People.commentList()}
      }
    })
    window.People.postList = Backbone.Collection.extend({
        model: window.People.post,
        localStorage: new Store("PeopleFeed"),
    })

    window.People.feed = new window.People.postList()

    window.People.postView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#tmpl-post').html()),

        events: {
            'click li.feed div.post'  : 'showComments',
            'click img.comment'       : 'showComments',
            'click img.like'          : 'likePost',
            'keypress #peopleFeed li.feed li.add input' : 'addOnEnter',
            'click #peopleFeed li.feed li.add button' : 'addOnClick',
        },

        initialize: function() {
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.remove, this);
            this.input = $(this.el).select('li.add input').first()
            console.log(this)
        },

        showComments: function() {
            alert('Comments')
            return false
        },
        
        likePost: function() {
            alert('Like')
            return false
        },
        
        addOnEnter: function(e) {
            var text = this.input.val();
            this.comments.create({
                author: 'Someone',
                text: text
            });
            this.input.val('');
        },
        
        addOnClick: function(e) {
            var text = this.input.val();
            People.feed.create({
                author: 'Someone',
                text: text
            });
            this.input.val('')
            return false
        },

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        
        remove: function() {
            $(this.el).remove();
        }
    })

    window.People.feedView = Backbone.View.extend({
        el: $('#peopleFeed'),
        input: $('#peopleFeed .add input'),
        add: $('#peopleFeed .add'),

        events: {
            'keypress #peopleFeed .add input': 'createOnEnter',
            'click #peopleFeed .add button': 'createOnClick'
        },

        createOnEnter: function(e) {
            var text = this.input.val();
            if (!text || e.keyCode != 13) return;
            People.feed.create({
                text: text
            });
            this.input.val('');
        },

        createOnClick: function(e) {
            var text = this.input.val();
            People.feed.create({
                text: text
            });
            this.input.val('');
        },

        addOne: function(post) {
            var view = new People.postView({
                model: post
            });
            this.add.after(view.render().el);
        },

        render: function()
        {
            $("#peopleFeed li:not(li[class=add])").remove()

            //$.tmpl(this.template, this.model).appendTo(this.el)
            return this
        },

        initialize: function() {
            People.feed.bind('add', this.addOne, this);
            //PeopleView.bind('reset', this.addAll, this);
            //PeopleView.bind('all',   this.render, this);
            this.render()
        }

    })


}

$(function() {
    init()
    var peopleFeed = new People.feedView()
})



