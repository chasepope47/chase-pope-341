const { MongoClient } = require('mongodb');
let db;

const connectToDb = (callback) => {
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      db = client.db('pantry');
      callback();
    })
    .catch((err) => console.error(err));
};

const getDb = () => db;
module.exports = { connectToDb, getDb };
