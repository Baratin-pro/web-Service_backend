'use strict';

const express = require('express');
const router = express.Router();
const tvCtrl = require('../controllers/tv.controller');
const auth = require('../middleware/auth');

module.exports = (app) => {
  router.get('/:id', auth, tvCtrl.getTv);

  app.use('/api/tv', router);
};
