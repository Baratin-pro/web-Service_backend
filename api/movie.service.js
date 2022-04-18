const htpp = require('./httpRequest');

module.exports = {
  genreList() {
    return htpp.RequestInstance.get(
      `genre/movie/list?api_key=${process.env.API_KEY}&language=${process.env.API_LANGUAGE}`
    );
  },
  getByGenreId(genreId, page = 1) {
    return htpp.RequestInstance.get(
      `genre/${genreId}/movies?api_key=${process.env.API_KEY}&language=${process.env.API_LANGUAGE}&page=${page}`
    );
  },
  getById(movieId) {
    return htpp.RequestInstance.get(
      `movie/${movieId}?api_key=${process.env.API_KEY}&language=${process.env.API_LANGUAGE}`
    );
  },
};
