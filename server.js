const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const port = process.env.PORT || 3000;

var knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('it is working!'));
app.post('/signin', (req, res) => signin.handleSignin(req, res, knex, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, knex, bcrypt));
app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, knex));
app.put('/image', (req, res) => image.handleImage(req, res, knex));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});