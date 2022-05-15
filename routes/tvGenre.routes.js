'use strict';

const express = require('express');
const router = express.Router();
const tvGenreCtrl = require('../controllers/tvGenre.controller');
const auth = require('../middleware/auth');

module.exports = (app) => {
  router.get('/', auth, tvGenreCtrl.list);
  router.get('/:id', auth, tvGenreCtrl.tvListByGenre);

  app.use('/api/tvGenre', router);
};
