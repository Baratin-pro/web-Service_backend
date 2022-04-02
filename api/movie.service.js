const htpp = require('./httpRequest');

module.exports = {
    listOfGenresForMovies() {
        return htpp.RequestInstance.get(
            `genre/movie/list?api_key=${process.env.API_KEY}&language=${process.env.API_LANGUAGE}`
        );
    },
    getByMovieId(movieId) {
        return htpp.RequestInstance.get(
            `movie/${movieId}?api_key=${process.env.API_KEY}&language=${process.env.API_LANGUAGE}`
        );
    },
    getByGroupId(groupId, page = 1) {
        return htpp.RequestInstance.get(
            `genre/${groupId}/movies?api_key=${process.env.API_KEY}&language=${process.env.API_LANGUAGE}&page=${page}`
        );
    },
};