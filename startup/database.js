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

  async function getFavorites(user) {
    try {
      let defaultFavs = {
        'user': user,
        'fav1': "Favorite #1",
        'fav2': "Favorite #2",
        'fav3': "Favorite #3",
        'inputtedFavs': false,
      }
      const query = { user: user };
      const favorites = await favoritesCollection.findOne(query) ?? defaultFavs;
      return favorites;
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  }

  async function updateFavorites(user, num, favorite) {
    try {
      let favorites = await getFavorites(user);
      favorites[num] = favorite;
      favorites.inputtedFavs = true;
      const query = { user: user };

      const result = await favoritesCollection.findOneAndReplace(
        query, // Find documents with the specified user
        favorites, // Replace the found document with the new document
        { returnOriginal: false, upsert: true } // Options: return the updated document, and insert if not found
      );
      return result;
    } catch (error) {
      console.error('Error adding document:', error);
    } 
  }

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
    getFavorites,
    updateFavorites,
    getUser,
    addEntry,
    getEntries,
    createUser
  };