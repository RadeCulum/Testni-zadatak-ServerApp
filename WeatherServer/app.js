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

setInterval( () => {
	databaseControler.updateDatabase();
}, properties.updateInterval);

app.listen(port, () => {
	databaseControler.insertCitiesIfDatabaseDoesEmpty();
});

app.get(properties.getCitiesRoute, async function(req, res){
	let cities = await databaseControler.getAllCities();
	res.status(200).json(cities);
})

app.post(properties.addCityRoute, async (req, res) => {
	let response = dataFetcher.fetchCityByName(req.body.city);
	if(response.cod === '404'){
		res.status('404').json({});
	}
	else if(response.cod === '200'){
		databaseControler.addCity(response.weather);
		res.status(200).json(response.weather);
	}
});
