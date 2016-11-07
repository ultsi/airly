
let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json(),
    when = require('when'),
    fs = require('fs'),
    morgan = require('morgan');

app.set('port', (process.env.PORT || 3000));
app.set('views', __dirname + '/views'); // parse views from dir views/
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public')); // serve static files from dir public/
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(app.get('port'), function() {
	console.log('Airly dev server is now running on port ', app.get('port'));
});

// dynamically include routes (Controllers)
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) === '.js') {
      const route = require('./controllers/' + file);
      route.controller(app);
  }
});
