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
const requestsCollection = db.collection("requests");


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

  function getUserByToken(token) {
    return userCollection.findOne({ token: token });
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

  async function updateFriends(friendSet, user) {
    try {
      const query = { user: user };

      const result = await friendsCollection.findOneAndReplace(
        query, // Find documents with the specified user
        friendSet, // Replace the found document with the new document
        { returnOriginal: false, upsert: true } // Options: return the updated document, and insert if not found
      );
      return result;
    } catch (error) {
      console.error('Error adding document:', error);
    } 
  }

  async function getFriends(user) {
    try {
      const query = { user: user };
      const friends = await friendsCollection.find(query).toArray();
      if (friends.length === 0) {
        return [];
      } else {
        return friends;
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  }

  async function getAllUsers() {
    userCollection.find({}, function(err, result) {
      if (err) {
          console.log("Error:", err);
      } else {
          return result;
      }
    })
  }

  async function getRequests(user) {
    try {
      const query = { user: user };
      const requests = await requestsCollection.find(query).toArray();
      if (requests.length === 0) {
        return [];
      } else {
        return requests;
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
    getUserByToken,
    createUser,
    getFavorites,
    updateFavorites,
    addEntry,
    getEntries,
    updateFriends,
    getFriends,
    getAllUsers,
    getRequests,
    createUser
  };
