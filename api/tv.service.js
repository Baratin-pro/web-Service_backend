const htpp = require('./httpRequest');

module.exports = {
  genreList() {
    return htpp.RequestInstance.get(
      `genre/tv/list?api_key=${process.env.API_KEY}&language=${process.env.API_LANGUAGE}`
    );
  },
  getByTvId(tvId) {
    return htpp.RequestInstance.get(
      `tv/${tvId}?api_key=${process.env.API_KEY}&language=${process.env.API_LANGUAGE}`
    );
  },
};
