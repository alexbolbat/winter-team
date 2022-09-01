import Vue from 'vue';
import Vuex from 'vuex';
import popularMovies from './modules/popularMovies';
import searchMovies from './modules/searchMovies';
import movieDetails from './modules/movieDetails';
import personDetails from './modules/personDetails';
import genres from './modules/genres';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    popularMovies,
    searchMovies,
    movieDetails,
    personDetails,
    genres
  }
});
