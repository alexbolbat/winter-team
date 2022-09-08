import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    movie: {},
    cast: [],
    reviews: []
  },
  getters: {
    movie(state) {
      return state.movie;
    },
    cast(state) {
      return state.cast;
    },
    reviews(state) {
      return state.reviews;
    }
  },
  mutations: {
    SET_MOVIE(state, data) {
      Vue.set(state, 'movie', data);
    },
    RESET_STATE(state) {
      state.movie = {};
    },
    SET_CAST(state, data) {
      Vue.set(state, 'cast', data);
    },
    SET_REVIEWS(state, data) {
      Vue.set(state, 'reviews', data);
    }
  },
  actions: {
    async fetchMovie({ commit }, id) {
      const { data } = await axios.get(`${apiURL}/movie/${id}`, {
        params: {
          api_key: apiKey,
          language: apiLang
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
    },
    async fetchCast({ commit }, id) {
      const { data } = await axios.get(`${apiURL}/movie/${id}/credits`, {
        params: {
          api_key: apiKey,
          language: apiLang
        }
      });
      commit(
        'SET_CAST',
        data.cast.map(item => ({
          name: item.name,
          profilePath: item.profile_path,
          id: item.id,
          character: item.character
        }))
      );
    },
    async fetchRewiews({ commit }, id) {
      const { data } = await axios.get(`${apiURL}/movie/${id}/reviews`, {
        params: {
          api_key: apiKey,
          language: apiLang
        }
      });
      commit(
        'SET_REVIEWS',
        data.results.map(item => ({
          author: item.author,
          avatarPath: item.author_details.avatar_path,
          id: item.id,
          content: item.content,
          created: item.created_at
        }))
      );
    }
  }
};
