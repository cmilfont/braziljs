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
 twitterWidget.render().start();

};

var renderPage = function(destaque, route, callback) {
  mostrarDestaque(destaque);
  ativarMenu(route);
  cb.call(this);
};
var iniciarTwitter = function(){
  if(twitterWidget) { twitterWidget.start(); } else { twitter(); }
};
var pararTwitter = function() { if(twitterWidget)  twitterWidget.stop(); };
 
 ;(function($) {

  var app = $.sammy('#corpo .container', function() {
    //this.use('GoogleAnalytics');
    //this.use(Sammy.XTemplate);
    
    this.get('#!/home', function() {
      this.partial('/views/home.html').then(function() {
      	renderPage(true, "#!/home", iniciarTwitter);
      });
    });
    
    this.get('#!/agenda', function() {
      this.partial('/views/agenda.html').then(function() {
      	renderPage(false, "#!/agenda", pararTwitter);
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
    $('#destaque').divSlideShow( { width:960, height:350, loop:999999, delay:10000 } );
  });
})(jQuery);