//Collection
var SearchList = Backbone.Collection.extend({});
//instance of collection
var search_list = new SearchList();

//View to show items collection
var ItemsView = Backbone.View.extend({
  template: _.template('<li><%=searchItem%></li>'),

  render: function(model) {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

//Main view
var SearchView = Backbone.View.extend({
  //define a template
  template: _.template("<label>Search</label><input type='text' id='search_input' /><input type='button' id='search_button' value='Search' /><input type='button' id='reset_button' value='Reset' /><ul></ul>"),

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addItem);
  },

  events: {
            "click #search_button": "saveItemOnClick",
            "click #reset_button": "removeItems",
            "keypress #search_input": "saveItemOnEnter"
        },

  saveItemOnClick: function(event) {
    var item = this.$("#search_input").val();
    if(item != ''){
        this.collection.add({searchItem: item});
        this.$("#search_input").val('');
    }
  },
  
   saveItemOnEnter: function(event) {
    var item = this.$("#search_input").val();
    if(event.keyCode == 13){
        this.collection.add({searchItem: item});
        this.$("#search_input").val('');
    }
  },

  addItem: function (item) {
    this.$('ul').append(new ItemsView({ model: item}).render().el);
  },

  removeItems: function() {
     this.collection.reset();
     this.$('ul').remove();
  },

   render: function() {
    this.$el.html(this.template);
    this.collection.each(this.addItem, this);
    return this;
  }
});


var search_view = new SearchView({ collection: search_list }).render().el;
$('#search_container').html(search_view);
