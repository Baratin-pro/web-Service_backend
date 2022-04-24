'use strict';

const api = require('../api/api');

exports.list = async (req, res) => {
  try {
    const apiGenreList = await api.tv.genreList();
    return res.status(200).json(apiGenreList.genres);
  } catch (e) {
    return res.status(500).json(e);
  }
};

exports.tvListByGenre = async (req, res) => {
  try {
    const apiTvList = await api.tv.getByGenreId(req.params.id);
    return res.status(200).json(apiTvList.results);
  } catch (e) {
    return res.status(500).json(e);
  }
};
