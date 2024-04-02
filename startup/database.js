const { MongoClient } = require ('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('foodyLog');
const userCollection = db.collection('users');
const entryCollection = db.collection('entries');
const favoritesCollection = db.collection('favorites');
const friendsCollection = db.collection("friends");


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });


  function getUser(userName) {
    return userCollection.findOne({ userName: userName });
  }

  function addEntry(entryObj) {
      entryCollection.insertOne(entryObj);
  }

  async function getEntries(user) {
    try {
      const query = { user: user };
      const entries = await entryCollection.find(query).toArray();
      if (entries.length === 0) {
        return [];
      } else {
        return entries;
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  }

  async function createUser(userName, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      userName: userName,
      password: passwordHash,
      token: uuid.v4(),
    };
    await userCollection.insertOne(user);
  
    return user;
  }

  module.exports = {
    getUser,
    addEntry,
    getEntries,
    createUser
  };
