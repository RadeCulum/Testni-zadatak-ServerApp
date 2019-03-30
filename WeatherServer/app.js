var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var databaseControler = require('./database-controler');
var dataFetcher = require('./data-fetcher');

var app = express();
var router = express.Router();

const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function(){
	databaseControler.insertCitiesIfDatabaseDoesEmty();
	console.log('Nastavio sam dalje');
});

app.get('/api/cities', async function(req, res, next){
	console.log(req.url + '  ' + req.method);
	var cities = await databaseControler.getAllCities();
	//res.setHeader('Access-Control-Allow-Origin', '*');
	res.status(200).json(cities);
	next();
})

app.post('/api/add', async function(req, res, next){
	console.log(req.url + '  ' + req.method);
	var response = dataFetcher.fetchCityByName(req.body.city);
	if(response.cod === '404'){
		console.log('Gad nije nadjen................');
		res.status('404');
	}
	else if(response.cod === '200'){
		console.log('Gad je nadjen................');
		databaseControler.addCity(response.weather);
		res.status(200).json(response.weather);
	}
	else{
		console.log('Nesto trece');
		console.log(response);
	}
	//res.setHeader('Access-Control-Allow-Origin', '*'');
	//res.setHeader('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	//res.setHeader('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	next();
});
