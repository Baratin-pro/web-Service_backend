'use strict';

const express = require('express');
const router = express.Router();
const tvCtrl = require('../controllers/tv.controller');

module.exports = (app) => {
  router.get('/:id', tvCtrl.getTv);

  app.use('/api/tv', router);
};
