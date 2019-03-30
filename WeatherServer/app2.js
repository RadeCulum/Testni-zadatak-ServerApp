var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var http = require('http');

var app = express();

var urlEncodedPareser = bodyParser.urlencoded({extended: false});

app.get('/', function(req, res){
  res.send('This is a home page');
  console.log('Connect');
})

app.get('/cities/addbyname/:name', function(req, res){
  var apiKey = '2b031a981aeb27fba4e3bce57b347e33';
  var city = req.params.name;
  var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2b031a981aeb27fba4e3bce57b347e33`;

  request(url, function(error, response, body){

    weather_json = JSON.parse(body);
    console.log(weather_json);
    //res.send(weather_json);

    var weather = {
      city : city,
      temperature: Math.round(weather_json.main.temp),
      description: weather_json.weather[0].description,
      //icon: weather_json.weather[0].icon,
      preasure: weather_json.main.preasure,
      temp_min: Math.round(weather_json.main.temp_min),
      temp_max: Math.round(weather_json.main.temp_max)
    };

    var weather_data = {weather : weather};

    res.send(weather);
  })
})

app.get('/cities/addbyid/:id', function(req, res){
  var apiKey = '2b031a981aeb27fba4e3bce57b347e33';
  var id = req.params.id;
  var url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=2b031a981aeb27fba4e3bce57b347e33`;

  request(url, function(error, response, body){

    weather_json = JSON.parse(body);
    console.log(weather_json);

    var cod = weather_json.code;

    if(cod == 200){
      var weather = {
        city : weather_json.name,
        temperature: Math.round(weather_json.main.temp),
        description: weather_json.weather[0].description,
        //icon: weather_json.weather[0].icon,
        preasure: weather_json.main.preasure,
        temp_min: Math.round(weather_json.main.temp_min),
        temp_max: Math.round(weather_json.main.temp_max)
      };

      var weather_data = {weather : weather};

      res.send(weather);
    }else{
      res.send(weather_json);
    }

  })
})


app.get('/cities/all', function(req, res){
  console.log("Connect");
  var citiCounter = 0;
  var lat = (Math.random() * 180.0) - 90;
  var lon = (Math.random() * 360.0) - 180;

  console.log(lat, lon);
  var apiKey = '2b031a981aeb27fba4e3bce57b347e33';
  var url = 'http://api.openweathermap.org/data/2.5/find?lat=' + lat + '&lon=' + lon + '&cnt=10&units=metric&appid=2b031a981aeb27fba4e3bce57b347e33';


  request(url, function(error, response, body){

    weather_json = JSON.parse(body);
    weather_list = weather_json.list;
    console.log(weather_list);

    var cod = weather_json.cod;
    var cities = [];

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
      res.send(cities);
    }else{
      res.send(weather_json);
    }

})


})

app.listen(3000);
