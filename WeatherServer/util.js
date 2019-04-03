const properties = require('./properties.js');

var contructUrlWithLatAndLon = (lat, lon)=> {
    return properties.openWeatherUrl + '/data/2.5/find?lat=' + lat + '&lon=' + lon + '&cnt=10&units=metric&appid=' + properties.apiKey;
}

var constructUrlWithCityName = (cityName)=> {
  return properties.openWeatherUrl + '/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + properties.apiKey;
}

var parseToMyWeatherFormat = (openWeatherObject)=> {
  return {
      city : openWeatherObject.name,
      temperature: Math.round(openWeatherObject.main.temp),
      description: openWeatherObject.weather[0].description,
      pressure: openWeatherObject.main.pressure,
      windSpeed: openWeatherObject.wind.speed,
      tempMin: Math.round(openWeatherObject.main.temp_min),
      tempMax: Math.round(openWeatherObject.main.temp_max)
    };
}

module.exports.contructUrlWithLatAndLon = contructUrlWithLatAndLon;
module.exports.constructUrlWithCityName =  constructUrlWithCityName;
module.exports.parseToMyWeatherFormat = parseToMyWeatherFormat;
