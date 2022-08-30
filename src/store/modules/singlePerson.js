import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    searchPerson: {}
  },
  getters: {
    searchPerson(state) {
      return state.searchPerson;
    }
  },
  mutations: {
    SET_PERSON(state, searched) {
      Vue.set(state.searchPerson, 'searched person', searched );
    }
  },
  actions: {
    async searchPerson({ commit }, { person_id }) {
      const searched = await axios.get(`${apiURL}/person/` + person_id, {
        params: {
          api_key: apiKey,
          language: apiLang,
        }
      });
      commit('SET_PERSON', {
        searched: searched.data.results.map(item => ({
          name: item.name,
          birthday: item.birthday,
          birthPlace: item.place_of_birth,
          deathday: item.deathday,
          profilePath: item.profile_path,
          biography: item.biography
        })),
      });
    }
  },  
};