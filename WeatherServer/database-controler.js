var MongoClient = require('mongodb');

var dataFetcher = require('./data-fetcher');

var dbUrl = "mongodb://localhost:27017/WeatherDB";

var insertCitiesIfDatabaseDoesEmty = async function(){
  let client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  let db = await client.db();
  var counter = await db.collection('cities').countDocuments();

  if(counter== 0){
    cities = dataFetcher.fetchRandomCities();
    console.log('Baza je prazna');
    cities.forEach(function(citi){
      db.collection("cities").insertOne(citi, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
      });
    });
  }else{
    console.log('Broj elemenata je ' + counter);
  }
    client.close();
}

var getAllCities = async function(){
  let client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  let db = await client.db();
  var cities = [];
  let cursor = await db.collection('cities').find({});
  await cursor.forEach(await function(element, err){
    cities.push(element);
  });
  client.close();
  return cities;
}

var addCity = async function(city){
  console.log('Dodaje grad................');
  let client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  let db = await client.db();
  db.collection("cities").insertOne(city, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });
  db.close();
}

module.exports.insertCitiesIfDatabaseDoesEmty = insertCitiesIfDatabaseDoesEmty;
module.exports.getAllCities = getAllCities;
module.exports.addCity = addCity;
