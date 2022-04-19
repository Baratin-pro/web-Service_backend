'use strict';

const api = require('../api/api');

exports.list = async (req, res) => {
  try {
    const apiGenreList = await api.movie.genreList();
    return res.status(200).json(apiGenreList.genres);
  } catch (e) {
    return res.status(500).json(e);
  }
};

exports.movieListByGenre = async (req, res) => {
  try {
    const apiMovieList = await api.movie.getByGenreId(req.params.id);
    return res.status(200).json(apiMovieList.results);
  } catch (e) {
    return res.status(500).json(e);
  }
};
