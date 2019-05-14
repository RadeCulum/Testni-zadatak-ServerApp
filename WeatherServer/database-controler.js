const  MongoClient = require('mongodb');

const  dataFetcher = require('./data-fetcher');
const properties = require('./properties');

const dbUrl = properties.databaserUrl;

let insertCitiesIfDatabaseDoesEmpty = async () => {
  let client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  let db = await client.db();
  let counter = await db.collection('cities').countDocuments();

  if(!counter){
    cities = dataFetcher.fetchRandomCities(10);
    db.collection("cities").insertMany(cities, (err, res)=> {
      if (err) { console.log(err) };
    });
  }
  client.close();
}

let getAllCities = async () => {
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

let addCity = async (city) => {
  let client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  let db = await client.db();
  db.collection("cities").insertOne(city, (err, res) => {
    if (err) {
      console.log(err);
    }
  });
  client.close();
}

let changeRow = async (element) => {
  let client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  let db = await client.db();
  let rndCities = dataFetcher.fetchRandomCities(1);

  await db.collection('cities').updateOne(element, { $set: rndCities[0] }, (err, res)=> {
    if (err) { console.log(err); }
  });

  client.close();
}

let updateDatabase = async ()=> {
  let client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  let db = await client.db();

  let cities = [];
  let cursor = await db.collection('cities').find({});

  await cursor.forEach(async (element, err)=> {
    try{
      let currentValue = { city : element.city };
      let newDocument = dataFetcher.fetchCityByName(element.city);

      await db.collection('cities').updateOne(element, { $set: newDocument.weather }, async (err, res)=> {
        if (err) {
          changeRow(element);
         }
      });

    } catch(exc) {
      changeRow(element);
    }
  });
  client.close();
}

module.exports.insertCitiesIfDatabaseDoesEmpty = insertCitiesIfDatabaseDoesEmpty;
module.exports.getAllCities = getAllCities;
module.exports.addCity = addCity;
module.exports.updateDatabase = updateDatabase;
