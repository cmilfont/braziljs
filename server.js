var express = require('express');

var app = express.createServer();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.bodyDecoder());
app.use(express.cookieDecoder());
app.use(express.session({ secret: 'keyboard cat' }));

var users = {
    name: 'Milfont', email: 'cmilfont@gmail.com'
};

app.get('/', function(req, res){
	
  console.log(req.query);

  res.render('home');
});

app.get('/agenda', function(req, res){ 
  res.render('agenda'); 
});


app.get('/palestrantes', function(req, res){ 
  var instrutores = [users];
  res.send(JSON.stringify(instrutores));
});

app.use(express.errorHandler({ showStack: true }));
app.use(express.staticProvider(__dirname));


app.listen(8000);
console.log('Express started on port 8000');