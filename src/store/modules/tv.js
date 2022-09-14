import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    cast: [],
    tv: {}
  },
  getters: {
    cast(state) {
      return state.cast;
    },
    tv(state) {
      return state.tv;
    },
    isLoading(state) {
      return state.isLoading;
    }
  },
  mutations: {
    SET_CAST(state, data) {
      Vue.set(state, 'cast', data);
    },
    SET_TV(state, data) {
      Vue.set(state, 'tv', data);
    },
    SET_LOADING(state) {
      state.isLoading = !state.isLoading;
    }
  },
  actions: {
    async fetchCast({ commit }, id) {

      try {
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
        commit('SET_LOADING');
      } catch (error) {
        alert('Can\'t download cast');
      }
    },
    async fetchTV({ commit }, id) {
      try {
        commit('SET_LOADING');
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
          inAir: data.first_air_date,
          seasonsInfo: data.seasons
        });
      } catch (error) {
        alert('Can\'t download tv');
      }

    }
  }
};
