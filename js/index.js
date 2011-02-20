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
    id: "twtr-widget",
     version: 2,
     type: 'search',
     search: 'braziljs',
     interval: 6000,
     title: 'BrazilJS',
     subject: 'The Brazilian JS Conference',
     width: 'auto',
     height: 415,
     theme: {
       shell: {
         background: '#450d0b',
         color: '#ffffff'
       },
       tweets: {
         background: '#ffffff',
         color: '#444444',
         links: '#1985b5'
       }
     },
     features: {
       scrollbar: true,
       loop: true,
       live: true,
       hashtags: true,
       timestamp: true,
       avatars: true,
       toptweets: true,
       behavior: 'default'
     }
 })
 twitterWidget.render().start();

};
 
 ;(function($) {

  var app = $.sammy('#corpo .container', function() {
    //this.use('GoogleAnalytics');
    //this.use(Sammy.XTemplate);
    
    this.get('#!/home', function() {
    	
      this.partial('/views/home.html').then(function() {
	      mostrarDestaque(true);
	      ativarMenu("#!/home");
        if(twitterWidget) {
        	twitterWidget.start();
        } else {
        	twitter();
        }
        
      });
      
    });
    
    this.get('#!/inscricoes', function() {
      this.partial('/views/inscricoes.html').then(function() {
        mostrarDestaque(false);
        ativarMenu("#!/inscricoes");
        if(twitterWidget)  twitterWidget.stop();
      });
    });
    
    this.get('#!/agenda', function() {
      this.partial('/views/agenda.html').then(function() {
        mostrarDestaque(false);
      	ativarMenu("#!/agenda");
        if(twitterWidget)  twitterWidget.stop();
      });
    });
    

  });

  $(function() {
    app.run('#!/home');
    $('#destaque').divSlideShow( { width:960, height:350, loop:999999, delay:10000 } );
  });
})(jQuery);