const userModels = require('./user.models');
const sourceModels = require('./source.models');

// Group every SCHEMA models
module.exports = {
  user: userModels,
  source: sourceModels,
};
