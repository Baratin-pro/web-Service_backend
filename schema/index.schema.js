const signupSchema = require('./signup.schema');
const loginSchema = require('./login.schema');

// Group every SCHEMA joi
module.exports = {
  signup: signupSchema,
  login: loginSchema,
};
