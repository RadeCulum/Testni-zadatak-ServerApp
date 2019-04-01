const  MongoClient = require('mongodb');

const  dataFetcher = require('./data-fetcher');
const properties = require('./properties');

const dbUrl = properties.databaserUrl;

var insertCitiesIfDatabaseDoesEmty = async ()=> {
  let client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  let db = await client.db();
  let counter = await db.collection('cities').countDocuments();

  if(!counter){
    cities = dataFetcher.fetchRandomCities();
    cities.forEach(function(citi){
      db.collection("cities").insertOne(citi, (err, res)=> {
        if (err) throw err;
      });
    });
  }
  client.close();
}

var getAllCities = async ()=> {
  let client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  let db = await client.db();
  let cities = [];
  let cursor = await db.collection('cities').find({});
  await cursor.forEach((element, err)=> {
    cities.push(element);
  });
  client.close();
  return cities;
}

var addCity = async (city)=> {
  let client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  let db = await client.db();
  db.collection("cities").insertOne(city, (err, res)=> {
    if (err) {
      throw err;
    }
  });
  client.close();
}

var updateDatabase = async ()=> {
  let client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  let db = await client.db();
  let cities = [];
  let cursor = await db.collection('cities').find({});
  await cursor.forEach(async (element, err)=> {
    let currentValue = { city : element.city };
    console.log('Trazim grad ' + element.city);
    let newDocument = await dataFetcher.fetchCityByName(element.city);
    console.log('Nasao grad ' + newDocument.weather.city);
    db.collection('cities').updateOne(element, { $set: newDocument.weather }, (err, res)=> {
      if (err){
        throw err;
      }
      console.log('  Update ' + element.city);
    })
  });
  client.close();
}

module.exports.insertCitiesIfDatabaseDoesEmty = insertCitiesIfDatabaseDoesEmty;
module.exports.getAllCities = getAllCities;
module.exports.addCity = addCity;
module.exports.updateDatabase = updateDatabase;
