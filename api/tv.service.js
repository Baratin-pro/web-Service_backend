const htpp = require('./httpRequest');

module.exports = {
  genreList() {
    return htpp.RequestInstance.get(
      `genre/tv/list?api_key=${process.env.API_KEY}&language=${process.env.API_LANGUAGE}`
    );
  },
  getByGenreId(genreId, page = 1) {
    return htpp.RequestInstance.get(
      `discover/tv?api_key=${process.env.API_KEY}&language=${process.env.API_LANGUAGE}&page=${page}&with_genres=${genreId}`
    );
  },
  getById(tvId) {
    return htpp.RequestInstance.get(
      `tv/${tvId}?api_key=${process.env.API_KEY}&language=${process.env.API_LANGUAGE}`
    );
  },
};
