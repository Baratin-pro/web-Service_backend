'use strict';

const express = require('express');
const router = express.Router();
const movieGenreCtrl = require('../controllers/movieGenre.controller');

module.exports = (app) => {
  router.get('/', movieGenreCtrl.list);

  app.use('/api/movieGenre', router);
};
