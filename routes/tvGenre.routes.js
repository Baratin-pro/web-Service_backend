'use strict';

const express = require('express');
const router = express.Router();
const tvGenreCtrl = require('../controllers/tvGenre.controller');

module.exports = (app) => {
  router.get('/', tvGenreCtrl.list);
  router.get('/:id', tvGenreCtrl.tvListByGenre);

  app.use('/api/tvGenre', router);
};
