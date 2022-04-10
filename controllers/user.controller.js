'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index.models');
const schema = require('../schema/index.schema');
const passwordComplexity = require('joi-password-complexity');
const complexityOptions = require('../utils/complexityOptions');

exports.signup = async (req, res) => {
  try {
    const isValid = schema.signup.validateAsync(req.body);
    if (!isValid) {
      return res.status(400).json({ message: 'Incorrect entry' });
    }

    const { error } = passwordComplexity(complexityOptions).validate(req.body.password);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const isExiting = await db.user.findOne({ email: req.body.email });
    if (isExiting) {
      return res.status(400).json({ message: 'Email already used' });
    }

    const user = new db.user(req.body);
    user.password = bcrypt.hashSync(req.body.password, 10);
    user
      .save()
      .then(() => res.status(201).json({ message: 'Created User' }))
      .catch((e) => res.status(404).json(e));
  } catch (e) {
    return res.status(500).json(e);
  }
};
