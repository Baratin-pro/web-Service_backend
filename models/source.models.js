'use strict';
const mongoose = require('mongoose');

const sourceSchema = mongoose.Schema({
  sourceId: { type: String, required: true },
  type: { type: String, required: true },
  likes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersFavorites: { type: [String] },
});

module.exports = mongoose.model('Source', sourceSchema);
