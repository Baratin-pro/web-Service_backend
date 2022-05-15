'use strict';

const api = require('../api/api');

exports.getMovie = async (req, res) => {
  try {
    const apiGetMovie = await api.movie.getById(req.params.id);
    return res.status(200).json(apiGetMovie);
  } catch (e) {
    return res.status(500).json(e);
  }
};
