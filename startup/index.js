const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');


// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

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

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

  // setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

