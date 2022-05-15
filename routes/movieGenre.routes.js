'use strict';

const express = require('express');
const router = express.Router();
const movieGenreCtrl = require('../controllers/movieGenre.controller');
const auth = require('../middleware/auth');

module.exports = (app) => {
  router.get('/', auth, movieGenreCtrl.list);
  router.get('/:id', auth, movieGenreCtrl.movieListByGenre);

  app.use('/api/movieGenre', router);
};
