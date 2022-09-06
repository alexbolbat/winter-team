import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    filmography: []
  },
  getters: {
    filmography(state) {
      return state.filmography;
    }
  },
  mutations: {
    SET_FILMOGRAPHY(state, data) {
      Vue.set(state, 'filmography', data);
    }
  },
  actions: {
    async fetchFilmography({ commit }, id) {
      const { data } = await axios.get(`${apiURL}/person/${id}/movie_credits`, {
        params: {
          api_key: apiKey,
          language: apiLang,
        }
      });
      commit('SET_FILMOGRAPHY', 
        data.cast.map( item => ({
          title: item.title,
          posterPath: item.poster_path,
          id: item.id,
          character: item.character
        }))
      );
    }
  },  
};