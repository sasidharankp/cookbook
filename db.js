import dotenv from 'dotenv';
dotenv.config()
import mongoose from 'mongoose';
const dbHost= process.env['ANCESTREE_DEV_DB_HOST'];
const dbUsername = process.env['ANCESTREE_DEV_DB_USERNAME'];
const dbPassword = process.env['ANCESTREE_DEV_DB_PASSWORD'];
const mongoDbUrl = 'mongodb+srv://'+dbUsername+':'+dbPassword+'@'+dbHost+'?retryWrites=true&w=majority';


let _db;

const initDb = callback => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }
  mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      _db = client;
      callback(null, _db);
    })
    .catch(err => {
      callback(err);
    });
    mongoose.set('useFindAndModify', false);
};

const getDb = () => {
  if (!_db) {
    throw Error('Database not initialzed');
  }
  return _db;
};

export default {initDb,getDb};