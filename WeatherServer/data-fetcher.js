const bodyParser = require('body-parser');
var request = require('sync-request');

var fetchRandomCities = function(){
  var cities = [];
  var weather_list = [];
  while(weather_list.length != 10){
    var citiCounter = 0;
    var lat = (Math.random() * 180.0) - 90;
    var lon = (Math.random() * 360.0) - 180;

    console.log(lat, lon);
    var apiKey = '2b031a981aeb27fba4e3bce57b347e33';
    var url = 'http://api.openweathermap.org/data/2.5/find?lat=' + lat + '&lon=' + lon + '&cnt=10&units=metric&appid=' + apiKey;

    var weather_json = JSON.parse(request('GET', url).body);
      weather_list = weather_json.list;
  }
  var cod = weather_json.cod;
  var i = 0;

  weather_list.forEach(function(element){
    var weather = {
      city : element.name,
        temperature: Math.round(element.main.temp),
        description: element.weather[0].description,
        pressure: element.main.pressure,
				windSpeed: element.wind.speed,
        temp_min: Math.round(element.main.temp_min),
        temp_max: Math.round(element.main.temp_max)
      };
      //console.log(weather);
      cities[i] = weather;
      i++;
    });
    console.log("Pokupio podatke");
    return cities;
  };

  var fetchCityByName = function(cityName){
    console.log('Trazim grad................');
    var apiKey = '2b031a981aeb27fba4e3bce57b347e33';
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;

    var weather_json = JSON.parse(request('GET', url).body)
    if(weather_json.cod === '404'){
      return {cod: '404', wether: '' };
    }
    else{
      var weather = {
        city : cityName,
        temperature: Math.round(weather_json.main.temp),
        description: weather_json.weather[0].description,
        pressure: weather_json.main.pressure,
        temp_min: Math.round(weather_json.main.temp_min),
        temp_max: Math.round(weather_json.main.temp_max)
        };
        var weather_data = {weather : weather};
        return {cod: '200', weather: weather};
    }
  }

module.exports.fetchRandomCities = fetchRandomCities;
module.exports.fetchCityByName = fetchCityByName;
