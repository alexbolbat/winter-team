import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    choosedPerson: {}
  },
  getters: {
    choosedPerson(state) {
      return state.choosedPerson;
    }
  },
  mutations: {
    SET_PERSON(state, choosed) {
      Vue.set(state.choosedPerson, 'person', choosed );
    }
  },
  actions: {
    async choosedPerson({ commit }, id) {
      const choosed = await axios.get(`${apiURL}/person/` + id, {
        params: {
          api_key: apiKey,
          language: apiLang,
        }
      });
      commit('SET_PERSON', {
        choosed: {
          name: choosed.data.name,
          birthday: choosed.data.birthday,
          birthPlace: choosed.data.place_of_birth,
          deathday: choosed.data.deathday,
          profilePath: choosed.data.profile_path,
          biography: choosed.data.biography
        },
      });
    }
  },  
};