const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require('dotenv').config({ path: path.join(__dirname, '.env') });
app.use(helmet());

mongoose
  .connect(process.env.MONGO_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connection to MongoDB successfull !'))
  .catch(() => console.log('Connexion to MongoDB fail !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/user.routes')(app);
require('./routes/movieGenre.routes')(app);
require('./routes/movie.routes')(app);
require('./routes/tvGenre.routes')(app);
require('./routes/tv.routes')(app);
require('./routes/source.routes')(app);
module.exports = app;
