import Vue from 'vue';
import Vuex from 'vuex';
import popularMovies from './modules/popularMovies';
import searchMovies from './modules/searchMovies';
import singleMovie from './modules/singleMovie';
import singlePerson from './modules/singlePerson';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    popularMovies,
    searchMovies,
    singleMovie,
    singlePerson,
  }
});