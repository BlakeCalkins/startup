const express = require('express');
const app = express();
const DB = require('./database.js');
const { Db } = require('mongodb');

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// login.js endpoints
let users = new Set();
app.post('/:user/credentials', (req, res) => {
  try {
    let credenObj = req.body;
    users.add(credenObj);

    res.json({ success: true, data: credenObj});
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// friends.js endpoints
app.post('/:user/friends', (req, res) => {
  try {
    friendSet = req.body;
    console.log('Received friendSet:', friendSet);

    // Save friendSet to a database

    res.json({ success: true, data: friendSet }); // Respond with a JSON success message
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

let friendSet = [];
apiRouter.get('/:user/friendSet', (_req, res) => {
  res.json(friendSet);
});

// homepage.js endpoints


app.post('/:user/favorites', async (req, res) => {
  let user = req.params.user;
  let incomingFav = req.body; 
  let favorite = incomingFav.favorite;
  let num = incomingFav.favNum;
  await DB.updateFavorites(user, num, favorite);
  console.log(user, num, favorite);
  res.json({ success: true, data: incomingFav }); // Respond with a JSON success message
});


app.get('/:user/currFavs', async (req, res) => {
  let favObj = await DB.getFavorites(req.params.user);
  console.log(favObj);
  res.json(favObj);
});

// entries.js functions



// entries.js endpoints

app.post('/:user/entry', async (req, res) => {
  try {
    let entryObj = req.body;
    res.json({ success: true, data: entryObj});
    await DB.addEntry(entryObj);
    console.log(entryObj);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/:user/entries', async (req, res) => {
  let entriesArray = await DB.getEntries(req.params.user);
  res.json(entriesArray);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

