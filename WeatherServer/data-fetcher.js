const bodyParser = require('body-parser');
const request = require('sync-request');

const properties = require('./properties.js');
const util = require('./util.js');

var fetchRandomCities = ()=> {
  let cities = [];
  let weatherList = [];
  while(weatherList.length != 10){
    let citiCounter = 0;
    let lat = (Math.random() * 180.0) - 90;
    let lon = (Math.random() * 360.0) - 180;
    let url = util.contructUrlWithLatAndLon(lat, lon);

    let weatherJson = JSON.parse(request('GET', url).body);
    weatherList = weatherJson.list;
  }
  let i = 0;
  weatherList.forEach((element)=> {
      cities[i] = util.parseToMyWeatherFormat(element);
      i++;
    });
    return cities;
  };

  var fetchCityByName = (cityName)=> {
    let url = util.constructUrlWithCityName(cityName);
    let weatherJson = JSON.parse(request('GET', url).body)
    if(weatherJson.cod === '404'){
      return {cod: '404', wether: '' };
    }
    else{
      let weather = util.parseToMyWeatherFormat(weatherJson);
      return {cod: '200', weather: weather};
    }
  }

module.exports.fetchRandomCities = fetchRandomCities;
module.exports.fetchCityByName = fetchCityByName;
