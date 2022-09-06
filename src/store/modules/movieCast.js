import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    cast: []
  },
  getters: {
    cast(state) {
      return state.cast;
    }
  },
  mutations: {
    SET_CAST(state, data) {
      Vue.set(state, 'cast', data);
    }
  },
  actions: {
    async fetchCast({ commit }, id) {
      const { data } = await axios.get(`${apiURL}/movie/${id}/credits`, {
        params: {
          api_key: apiKey,
          language: apiLang,
        }
      });
      commit('SET_CAST', 
        data.cast.map( item => ({
          name: item.name,
          profilePath: item.profile_path,
          id: item.id,
          character: item.character
        }))
      );
    }
  },  
};