'use strict';

const express = require('express');
const router = express.Router();
const sourceCtrl = require('../controllers/source.controller');
const auth = require('../middleware/auth');

module.exports = (app) => {
  router.post('/:sourceId', auth, sourceCtrl.sourceLikeOrFavory);
  router.get('/:sourceId', auth, sourceCtrl.getBySourceId);
  router.get('/', auth, sourceCtrl.getFavoritesByUser);

  app.use('/api/source', router);
};
