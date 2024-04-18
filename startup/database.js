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
      let friendObj = {
        user: user,
        friends: friendSet
      }
      const result = await friendsCollection.findOneAndReplace(
        query, // Find documents with the specified user
        friendObj, // Replace the found document with the new document
        { returnOriginal: false, upsert: true } // Options: return the updated document, and insert if not found
      );
      return result;
    } catch (error) {
      console.error('Error adding document:', error);
    } 
  }

  // async function getFriends(user) {
  //   try {
  //     console.log(user);
  //     const query = { user: user };
  //     const friendObj = await friendsCollection.find(query);
  //     let friendsArray = friendObj.friends;
  //     console.log(friendsArray);
  //     if (!friendsArray) {
  //       return [];
  //     } else {
  //       return friendsArray;
  //     }
  //   } catch (error) {
  //     console.error('Error fetching documents:', error);
  //   }
  // }
  async function getFriends(user) {
    try {
        const query = { user: user };
        const friendObj = await friendsCollection.findOne(query);

        console.log('Friend document:', friendObj); // Log the document found by the query

        if (!friendObj) {
            return []; // No document found for the specified user
        }

        // Access the friends field from the document
        const friendsArray = friendObj.friends;

        if (!friendsArray) {
            return []; // Friends array is empty or undefined
        }

        return friendsArray;
    } catch (error) {
        console.error('Error fetching documents:', error);
        return []; // Return an empty array or handle the error as needed
    }
}

  

  // async function getAllUsers() {
  //   userCollection.find({}, function(err, result) {
  //     if (err) {
  //         console.log("Error:", err);
  //     } else {
  //         return result;
  //     }
  //   })
  // }
  async function getAllUsers() {
    try {
        const users = await userCollection.find({}, { projection: { userName: 1 } }).toArray();

        const names = users.map(user => user.userName);
        console.log(names);
        return names;
    } catch (error) {
        console.error('Error fetchingS users:', error);
    }
}

async function getRequests(user) {
  try {
      const query = { user: user };
      const requests = await requestsCollection.find(query).toArray();

      if (requests.length === 0) {
          return [];
      } else {
          // Extract the requester field from each document and put them into an array
          const requesters = requests.map(request => request.requester);
          return requesters;
      }
  } catch (error) {
      console.error('Error fetching documents:', error);
      return []; // Return an empty array or handle the error as needed
  }
}

  async function addRequest(requestObj) {
      requestsCollection.insertOne(requestObj, function(err, result) {
        if (err) {
            console.log("Error:", err);
        } else {
            console.log("Request added successfully:", result);
        }
    })
  }

  // async function deleteRequest(user, requester) {
  //   const query = { 
  //     user: user,
  //     requester: requester
  //    };
  //   await requestsCollection.deleteOne(query, function(err, result) {
  //     if (err) {
  //       console.log("Error:", err);
  //     } else {
  //         console.log("Document removed successfully:", result);
  //     }
  //   })
  // }
  async function deleteRequest(user, requester) {
    try {
        const query = { user: user, requester: requester };
        const result = await requestsCollection.deleteOne(query);
        console.log("Document removed successfully:", result);
    } catch (err) {
        console.error("Error:", err);
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
    addRequest,
    deleteRequest,
    createUser,
  };
