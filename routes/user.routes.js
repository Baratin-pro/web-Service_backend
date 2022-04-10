'use strict';

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');

module.exports = (app) => {
  router.post('/signup', userCtrl.signup);

  app.use('/api/user', router);
};
