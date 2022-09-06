import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    reviews: []
  },
  getters: {
    reviews(state) {
      return state.reviews;
    }
  },
  mutations: {
    SET_REVIEWS(state, data) {
      Vue.set(state, 'reviews', data);
    }
  },
  actions: {
    async fetchRewiews({ commit }, id) {
      const { data } = await axios.get(`${apiURL}/movie/${id}/reviews`, {
        params: {
          api_key: apiKey,
          language: apiLang,
        }
      });
      commit('SET_REVIEWS', 
        data.results.map( item => ({
          author: item.author,
          avatarPath: item.author_details.avatar_path,
          id: item.id,
          content: item.content,
          created: item.created_at
        }))
      );
    }
  },  
};