const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')


const databaseControler = require('./database-controler');
const dataFetcher = require('./data-fetcher');
const properties = require('./properties.js');

const app = express();

const port = properties.port;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

setInterval(function(){
	console.log('Update');
	databaseControler.updateDatabase();
}, properties.updateInterval);

app.listen(port, function(){
	console.log('Running');
	databaseControler.insertCitiesIfDatabaseDoesEmty();
});

app.get(properties.getCitiesRoute, async function(req, res, next){
	let cities = await databaseControler.getAllCities();
	res.status(200).json(cities);
	next();
})

app.post(properties.addCityRoute, async function(req, res, next){
	let response = dataFetcher.fetchCityByName(req.body.city);
	if(response.cod === '404'){
		res.status('404');
	}
	else if(response.cod === '200'){
		databaseControler.addCity(response.weather);
		res.status(200).json(response.weather);
	}
	next();
});
