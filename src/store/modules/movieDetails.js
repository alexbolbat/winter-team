import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    choosedMovie: {}
  },
  getters: {
    choosedMovie(state) {
      return state.choosedMovie;
    }
  },
  mutations: {
    SET_MOVIE(state, choosed) {
      Vue.set(state.choosedMovie, 'movie', choosed );
    }
  },
  actions: {
    async choosedMovie({ commit }, id) {
      const choosed = await axios.get(`${apiURL}/movie/` + id, {
        params: {
          api_key: apiKey,
          language: apiLang,
        }
      });
      commit('SET_MOVIE', {
        choosed: {
          title: choosed.data.title,
          overview: choosed.data.overview,
          backdropPath: choosed.data.backdrop_path,
          genreIds: choosed.data.genres,
          posterPath: choosed.data.poster_path,
          releaseDate: choosed.data.release_date,
          voteAverage: choosed.data.vote_average,
          tagline: choosed.data.tagline
        }
      });
    }
  }  
};