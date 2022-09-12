import Vue from 'vue';
import Vuex from 'vuex';

import person from './modules/person';

import movie from './modules/movie';
import genres from './modules/genres';
import tv from './modules/tv';
import resultsList from './modules/resultsList';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    person,
    tv,
    movie,
    genres,
    resultsList
  }
});
