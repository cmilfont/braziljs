var express = require('express'), crypto = require('crypto');

function md5(str) { return crypto.createHash('md5').update(str).digest('hex'); }

var app = express.createServer();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));

var palestrantes = [
  {
  id: 1
  , name: "Christiano Milfont"
  , photo: "http://pt.gravatar.com/userimage/972433/b60fc161487aed1f8559130a7aa959c5.jpeg"
  , twitter: "@cmilfont"
  , site: "http://www.milfont.org"
  }
];

var agenda = [
	{horario: "07H00", palestra: {tema: "Tema a confirmar", palestrantes:palestrantes }}
  ,{
    horario: "13H00"
    , palestra: {
    tema: "Lightning Talks - 10min"
    , lightning: [{horario: "13H00", palestra: {tema: "Tema a confirmar", palestrantes:palestrantes}}]
  }
}
];

app.get('/', function(req, res){
  res.render("index");
});

app.get('/agenda', function(req, res){ 
  res.send(JSON.stringify(agenda));
});


app.get('/palestrantes', function(req, res){ 
  res.send(JSON.stringify(palestrantes));
});

app.use(express.errorHandler({ showStack: true }));
app.use(express.static(__dirname));

app.listen(8000);
console.log('Express started on port 8000');