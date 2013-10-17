var AppRouter = Backbone.Router.extend({

    routes: {
        ""                      : "home",
        "speakers"	            : "list",
        "speakers/page/:page"	: "list",
        "speakers/add"          : "addSpeaker",
        "speakers/:id"          : "speakerDetails",
        "about"                 : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var speakerList = new SpeakerCollection();
        speakerList.fetch({success: function(){
            $("#content").html(new SpeakerListView({model: speakerList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    speakerDetails: function (id) {
        var speaker = new Speaker({_id: id});
        speaker.fetch({success: function(){
            $("#content").html(new SpeakerView({model: speaker}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addSpeaker: function() {
        var speaker = new Speaker();
        $('#content').html(new SpeakerView({model: speaker}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'SpeakerView', 'SpeakerListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});