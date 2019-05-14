const properties = require('./properties.js');

let contructUrlWithLatAndLon = (lat, lon, num ) => {
    return properties.openWeatherUrl + '/data/2.5/find?lat=' + lat + '&lon=' + lon + '&cnt=' + num + '&units=metric&appid=' + properties.apiKey;
}

let constructUrlWithCityName = (cityName) => {
  return properties.openWeatherUrl + '/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + properties.apiKey;
}

let parseToMyWeatherFormat = (openWeatherObject) => {
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
