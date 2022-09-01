import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    movie: {}
  },
  getters: {
    movie(state) {
      return state.movie;
    }
  },
  mutations: {
    SET_MOVIE(state, data) {
      Vue.set(state, 'movie', data );
    }
  },
  actions: {
    async fetchMovie({ commit }, id) {
      const { data } = await axios.get(`${apiURL}/movie/${id}`, {
        params: {
          api_key: apiKey,
          language: apiLang,
        }
      });
      commit('SET_MOVIE', {
        title: data.title,
        overview: data.overview,
        backdropPath: data.backdrop_path,
        genreIds: data.genres,
        posterPath: data.poster_path,
        releaseDate: data.release_date,
        voteAverage: data.vote_average,
        tagline: data.tagline
      });
    }
  }  
};