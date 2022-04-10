'use strict';

const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
    .max(100),
  password: Joi.string().required(),
  username: Joi.string().required().alphanum().max(80),
});
