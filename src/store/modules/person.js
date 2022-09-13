import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    person: {},
    filmography: []
  },
  getters: {
    person(state) {
      return state.person;
    },
    filmography(state) {
      return state.filmography;
    }
  },
  mutations: {
    SET_PERSON(state, data) {
      Vue.set(state, 'person', data);
    },
    RESET_STATE(state) {
      state.person = {};
    },
    SET_FILMOGRAPHY(state, data) {
      Vue.set(state, 'filmography', data);
    }
  },
  actions: {
    async fetchPerson({ commit }, id) {
      const { data } = await axios.get(`${apiURL}/person/${id}`, {
        params: {
          api_key: apiKey,
          language: apiLang
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
    },
    async fetchFilmography({ commit }, id) {
      const { data } = await axios.get(`${apiURL}/person/${id}/combined_credits`, {
        params: {
          api_key: apiKey,
          language: apiLang
        }
      });
      commit(
        'SET_FILMOGRAPHY',
        data.cast.map(item => ({
          title: item.title,
          name: item.name,
          posterPath: item.poster_path,
          id: item.id,
          character: item.character,
          mediaType: item.media_type,
          creditID: item.credit_id
        }))
      );
    }
  }
};
