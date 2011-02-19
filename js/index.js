var ativarMenu = function(route) {
  $('#menu li').removeClass('active');
  $('#menu li a[href*="'+route+'"]').parent().addClass("active");
};
var mostrarDestaque = function(toggle) {
	if(toggle) {
    $("#destaque").show();
    $('body').addClass('inicial');
    
    $(document).ready(function(){
      $('#destaque').divSlideShow( { width:960, height:350, loop:999999, delay:10000 } );
    });
    
    
	} else {
    $("#destaque").hide();
    $('body').removeClass('inicial');
	}
};
 
 ;(function($) {

  var app = $.sammy('#corpo .container', function() {
    //this.use('GoogleAnalytics');
    this.use(Sammy.XTemplate);

    this.get('#palestrantes', function() {
      this.load('palestrantes', {cache: true, json:true})
          .render('/templates/palestrantes.ejs')
          .swap();
    });
    
    this.get('#!home', function() {
    	
      ativarMenu("#!home");
    	mostrarDestaque(true);

      this.partial('/views/home.ejs');
    });
    
    this.get('#!agenda', function() {
    	ativarMenu("#!agenda");
    	mostrarDestaque(false);
      this.partial('/views/agenda.ejs');
    });

  });

  $(function() {
    app.run('#!home');
  });
})(jQuery);