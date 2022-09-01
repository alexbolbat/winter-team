import Vue from 'vue';
import Vuex from 'vuex';
import popularMovies from './modules/popularMovies';
import searchMovies from './modules/searchMovies';
import movieDetails from './modules/movieDetails';
import personDetails from './modules/personDetails';
import personFilmography from './modules/personFilmography';
import movieCast from './modules/movieCast';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    popularMovies,
    searchMovies,
    movieDetails,
    personDetails,
    personFilmography,
    movieCast,
  }
});