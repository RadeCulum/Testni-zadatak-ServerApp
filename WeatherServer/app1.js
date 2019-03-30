var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

var server = http.createServer(function(req, res){
  console.log('request was made: ' + req.url);

  if(req.url === '/cities/all'){
    console.log("Connect");


    var citiCounter = 0;
    var lat = Math.random() * 90.0;
    var lon = Math.random() * 180.0;

    console.log(lat, lon);
    var apiKey = '2b031a981aeb27fba4e3bce57b347e33';
    var url = 'http://api.openweathermap.org/data/2.5/find?lat=' + lat + '&lon=' + lon + '&cnt=10&units=metric&appid=2b031a981aeb27fba4e3bce57b347e33';
    var cities = [];

    request(url, function(error, response, body){
      weather_json = JSON.parse(body);
      weather_list = weather_json.list;
      console.log(weather_list);

      var cod = weather_json.cod;


      if(cod == 200){
        var i = 0;
        weather_list.forEach(function(element){
          var weather = {
            city : element.name,
            temperature: Math.round(element.main.temp),
            description: element.weather[0].description,
            //icon: weather_json.weather[0].icon,
            preasure: element.main.preasure,
            temp_min: Math.round(element.main.temp_min),
            temp_max: Math.round(element.main.temp_max)
          };
          console.log(weather);
          cities[i] = weather;
          i++;
        })
      }else{
      }
    });
    res.setHeader('Access-Control-Allow-Origin', '*');
	  res.setHeader('Access-Control-Request-Method', '*');
	  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	  res.setHeader('Access-Control-Allow-Headers', '*');
    res.writeHead(200, {'Content-Type' : 'application/json'});
    console.log(res);
    res.output = cities;
    res.end();
  }
});

server.listen(3000, '127.0.0.1');
console.log('Now listening on port 3000');
