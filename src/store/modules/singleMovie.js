import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    searchMovie: {}
  },
  getters: {
    searchMovie(state) {
      return state.searchMovie;
    }
  },
  mutations: {
    SET_MOVIE(state, searched) {
      Vue.set(state.searchMovie, 'searched movie', searched );
    }
  },
  actions: {
    async searchMovie({ commit }, { movie_id }) {
      const searched = await axios.get(`${apiURL}/movie/` + movie_id, {
        params: {
          api_key: apiKey,
          language: apiLang,
        }
      });
      commit('SET_MOVIE', {
        searched: searched.data.results.map(item => ({
          title: item.title,
          overview: item.overview,
          backdropPath: item.backdrop_path,
          genreIds: item.genres,
          posterPath: item.poster_path,
          releaseDate: item.release_date,
          voteAverage: item.vote_average
        })),
      });
    }
  },  
};