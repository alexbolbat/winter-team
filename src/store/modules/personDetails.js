import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    person: {}
  },
  getters: {
    person(state) {
      return state.person;
    }
  },
  mutations: {
    SET_PERSON(state, data) {
      Vue.set(state, 'person', data );
    },
    RESET_STATE(state) {
      state.person = {};
    },
  },
  actions: {
    async fetchPerson({ commit }, id) {
      const { data } = await axios.get(`${apiURL}/person/${id}`, {
        params: {
          api_key: apiKey,
          language: apiLang,
        }
      });
      commit('SET_PERSON', {
        name: data.name,
        birthday: data.birthday,
        birthPlace: data.place_of_birth,
        deathday: data.deathday,
        profilePath: data.profile_path,
        biography: data.biography
      });
    }
  },  
};