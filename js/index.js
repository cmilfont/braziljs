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
	      ativarMenu("#!/home");
        mostrarDestaque(true);
        if(twitterWidget) {
        	twitterWidget.start();
        } else {
        	twitter();
        }
        
      });
      
    });
    
    this.get('#!/inscricoes', function() {
      this.partial('/views/inscricoes.html').then(function() {
        ativarMenu("#!/inscricoes");
        mostrarDestaque(false);
        if(twitterWidget)  twitterWidget.stop();
      });
    });
    
    this.get('#!/agenda', function() {
      this.partial('/views/agenda.html').then(function() {
        ativarMenu("#!/agenda");
        mostrarDestaque(false);
        if(twitterWidget)  twitterWidget.stop();
      });
    });
    
    this.get('#!/local', function() {
      ativarMenu("#!/local");
      mostrarDestaque(false);
      this.load('agenda', {cache: true, json:true})
          .render('/views/palestrantes.html')
          .swap();
    });

  });

  $(function() {
    app.run('#!/home');
    $(document).ready(function(){
      $('#destaque').divSlideShow( { width:960, height:350, loop:999999, delay:10000 } );
    });
  });
})(jQuery);