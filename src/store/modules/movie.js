import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    movie: {},
    cast: [],
    reviews: [],
    similar: []
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
    },
    similar(state) {
      return state.similar;
    },
    isLoading(state) {
      return state.isLoading;
    }
  },
  mutations: {
    SET_MOVIE(state, data) {
      Vue.set(state, 'movie', data);
    },

    SET_CAST(state, data) {
      Vue.set(state, 'cast', data);
    },
    SET_REVIEWS(state, data) {
      Vue.set(state, 'reviews', data);
    },
    SET_SIMILAR(state, data) {
      Vue.set(state, 'similar', data);
    },
    SET_LOADING(state) {
      state.isLoading = !state.isLoading;
    }
  },
  actions: {
    async fetchMovie({ commit }, id) {
      commit('SET_LOADING');
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
          character: item.character,
          creditID: item.credit_id
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
    },
    async fetchSimilar({ commit }, id) {
      const { data } = await axios.get(
        `${apiURL}/movie/${id}/recommendations`,
        {
          params: {
            api_key: apiKey,
            language: apiLang
          }
        }
      );
      commit(
        'SET_SIMILAR',
        data.results.map(item => ({
          posterPath: item.poster_path,
          id: item.id,
          title: item.title
        }))
      );
      commit('SET_LOADING');
    }
  }
};
