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

    const emailDb = await getByEmail(req.body.email);
    const usernameDb = await db.user.findOne({ username: req.body.username });
    if (emailDb || usernameDb) {
      return res.status(400).json({ message: 'Email or username already used' });
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

exports.login = async (req, res) => {
  try {
    const isValid = schema.login.validateAsync(req.body);
    if (!isValid) {
      return res.status(400).json({ message: 'Incorrect entry' });
    }

    const userDb = await getByEmail(req.body.email);
    if (!userDb) {
      return res.status(404).json({ message: 'Email or password invalid' });
    }

    const passwordValid = bcrypt.compareSync(req.body.password, userDb.password);
    if (!passwordValid) {
      return res.status(404).json({ message: 'Email or password invalid' });
    }
    return res.status(200).json({
      token: jwt.sign({ userId: userDb._id }, process.env.TOKEN_SECRET, {
        expiresIn: '24h',
      }),
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};

exports.account = async (req, res) => {
  try {
    let userDb = await getById(req.user.userId);
    if (!userDb) {
      return res.status(401).json({ message: 'Request invalid !' });
    }
    userDb.password = undefined;
    return res.status(200).json(userDb);
  } catch (e) {
    return res.status(500).json(e);
  }
};

async function getById(id) {
  return await db.user.findOne({ _id: id });
}

async function getByEmail(email) {
  return await db.user.findOne({ email: email });
}
