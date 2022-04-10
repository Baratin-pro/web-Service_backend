'use strict';

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const rateLimite = require('../middleware/rateLimit');

module.exports = (app) => {
  router.post('/signup', userCtrl.signup);
  router.post('/login', rateLimite, userCtrl.login);

  app.use('/api/user', router);
};
