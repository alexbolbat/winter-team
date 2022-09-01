import Vue from 'vue';
import Vuex from 'vuex';
import popularMovies from './modules/popularMovies';
import searchMovies from './modules/searchMovies';
import choosedMovie from './modules/choosedMovie';
import choosedPerson from './modules/choosedPerson';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    popularMovies,
    searchMovies,
    choosedMovie,
    choosedPerson,
  }
});