const movieService = require('./movie.service');
const tvService = require('./tv.service');

// Group every API services
module.exports = {
    movie: movieService,
    tv: tvService,
};