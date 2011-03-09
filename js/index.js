_uacct = "UA-20244589-2"; 

var _gaq = _gaq || [];
_gaq.push(['_setAccount', _uacct]);
_gaq.push(['_trackPageview']);

 var pageTracker = _gat._getTracker(_uacct); 
 pageTracker._initData(); 
 pageTracker._trackPageview(); 

var ativarMenu = function(route) {
  $('#menu li').removeClass('active');
  $('#menu li a[href*="'+route+'"]').parent().addClass("active");
};
var mostrarDestaque = function(toggle) {
	if(toggle) {
    $("#destaque").show();
    $('body').addClass('inicial');
	} else {
    $("#destaque").hide();
    $('body').removeClass('inicial');
	}
};

var twitterWidget;

var twitter = function() {

  twitterWidget = new TWTR.Widget({
     id: "twtr-widget", width: 'auto', height: 415,
     version: 2, type: 'search',search: 'braziljs', interval: 6000,
     title: 'BrazilJS', subject: 'The Brazilian JS Conference',
     theme: {
       shell: { background: '#450d0b', color: '#ffffff' },
       tweets: { background: '#ffffff', color: '#444444', links: '#1985b5'}
     },
     features: {
       scrollbar: true,loop: true,live: true,
       hashtags: true,timestamp: true,avatars: true,toptweets: true,
       behavior: 'default'
     }
 })
 twitterWidget.render();

};

var renderPage = function(destaque, route, callback) {
  mostrarDestaque(destaque);
  ativarMenu(route);
  callback.call(this);
};
var iniciarTwitter = function(){
	pararTwitter();
  if(twitterWidget) { twitterWidget.start(); }
};
var pararTwitter = function() { if(twitterWidget)  twitterWidget.stop(); };

var call4paperz = {
  url: "http://call4paperz.com/events/13.jsonp",
  callback: function() {
    var sammy = this;
    var proposals = sammy.content.event.proposals;
    $("td.lightning", "table#programacao table tr")
    .each(function(index) {
      sammy.render('/views/lightning.html', proposals[index]).replace($(this));
    });
  }
};

 ;(function($) {

  var app = $.sammy('#corpo .container', function() {
    this.use('GoogleAnalytics');
  	this.use(Sammy.Mustache, "html");
    
    this.get('#!/home', function() {
    	
      this.partial('/views/home.html').then(function() {
      	twitter();
      	renderPage(true, "#!/home", iniciarTwitter);
      	$('#destaque').divSlideShow( { width:960, height:350, loop:999999, delay:10000 } );
      });
    });
    
    this.get('#!/agenda', function() {

      this.partial('/views/agenda.html')
      .then(function() {
      	renderPage(false, "#!/agenda", pararTwitter);
        this.load(call4paperz.url, {dataType: "jsonp"}, call4paperz.callback);
      });
      
    });

    this.get('#!/local', function() {
      this.partial('/views/local.html').then(function() {
      	renderPage(false, "#!/local", pararTwitter);
      });
    });
    
    this.get('#!/inscricoes', function() {
      this.partial('/views/inscricoes.html').then(function() {
        renderPage(false, "#!/inscricoes", pararTwitter);
      });
    });

    this.get('#!/quemsomos', function() {
      this.partial('/views/quemsomos.html').then(function() {
        renderPage(false, "#!/quemsomos", pararTwitter);
      });
    });

    this.get('#!/contato', function() {
      this.partial('/views/contato.html').then(function() {
        renderPage(false, "#!/contato", pararTwitter);
      });
    });
    
  });

  $(function() {
    app.run('#!/home');
  });
})(jQuery);