'use strict';

const express = require('express');
const router = express.Router();
const movieCtrl = require('../controllers/movie.controller');
const auth = require('../middleware/auth');

module.exports = (app) => {
  router.get('/:id', auth, movieCtrl.getMovie);

  app.use('/api/movie', router);
};
