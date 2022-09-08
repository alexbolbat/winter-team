import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    cast: [],
    tv: {}
  },
  getters: {
    cast(state) {
      return state.cast;
    },
    tv(state) {
      return state.tv;
    }
  },
  mutations: {
    SET_CAST(state, data) {
      Vue.set(state, 'cast', data);
    },
    SET_TV(state, data) {
      Vue.set(state, 'tv', data);
    }
  },
  actions: {
    async fetchCast({ commit }, id) {
      const { data } = await axios.get(`${apiURL}/tv/${id}/credits`, {
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
    async fetchTV({ commit }, id) {
      const { data } = await axios.get(`${apiURL}/tv/${id}`, {
        params: {
          api_key: apiKey,
          language: apiLang
        }
      });
      commit('SET_TV', {
        name: data.name,
        tagline: data.tagline,
        overview: data.overview,
        status: data.status,
        posterPath: data.poster_path,
        genreIds: data.genres,
        voteAverage: data.vote_average,
        seasons: data.number_of_seasons,
        episodes: data.number_of_episodes,
        inAir: data.first_air_date
      });
    }
  }
};
