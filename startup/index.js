const express = require('express');
const app = express();

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
app.post('/friends', (req, res) => {
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
apiRouter.get('/friendSet', (_req, res) => {
  res.json(friendSet);
});

// homepage.js endpoints
let user = '';
let fav1 = "Favorite #1";
let fav2 = "Favorite #2";
let fav3 = "Favorite #3";
let inputtedFavs = false;

app.post('/:user/favorites', (req, res) => {
  user = req.params.user;
  let incomingFavs = req.body; 
  let num = incomingFavs.favNum;
  switch (num) {
    case "fav1":
      fav1 = incomingFavs.favorite;
      break;
    case "fav2":
      fav2 = incomingFavs.favorite;
      break;
    case "fav3":
      fav3 = incomingFavs.favorite;
      break;
  } 
  inputtedFavs = incomingFavs.inputtedFavs;
  console.log(`fav1's value' : ${fav1}`);
  console.log(`fav2's value' : ${fav2}`);
  console.log(`fav3's value' : ${fav3}`);

  console.log('user was set to: ', user);
  console.log(`inputtedFavs was set to: `, inputtedFavs);
  res.json({ success: true, data: incomingFavs }); // Respond with a JSON success message
});

let favObj = {
  "inputtedFavs": inputtedFavs,
  "fav1": fav1,
  "fav2": fav2,
  "fav3": fav3,
};
app.get('/:user/currFavs', (_req, res) => {
  favObj = {
    "inputtedFavs": inputtedFavs,
    "fav1": fav1,
    "fav2": fav2,
    "fav3": fav3,
  };
  console.log(favObj);
  res.json(favObj);
});

// entries.js endpoints

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

