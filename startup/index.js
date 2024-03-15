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

let user = '';
let favObj = {};
let fav1 = '';
let fav2 = '';
let fav3 = '';

app.post('/:user/favorites', (req, res) => {
  user = req.params.user;
  favObj = req.body; 
  let num = favObj.favNum;
  switch (num) {
    case "fav1":
      fav1 = favObj.favorite;
      break;
    case "fav2":
      fav2 = favObj.favorite;
      break;
    case "fav3":
      fav3 = favObj.favorite;
      break;
  } 
  console.log(`${favObj.favNum} was set to : ${favObj.favorite}`);
  console.log('user was set to: ', user);
  res.json({ success: true, data: favObj }); // Respond with a JSON success message
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

