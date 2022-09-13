import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    person: {},
    filmography: []
  },
  getters: {
    person(state) {
      return state.person;
    },
    filmography(state) {
      return state.filmography;
    },
    isLoading(state) {
      return state.isLoading;
    }
  },
  mutations: {
    SET_PERSON(state, data) {
      Vue.set(state, 'person', data);
    },

    SET_FILMOGRAPHY(state, data) {
      Vue.set(state, 'filmography', data);
    },
    SET_LOADING(state) {
      state.isLoading = !state.isLoading;
    }
  },
  actions: {
    async fetchPerson({ commit }, id) {
      try {
        commit('SET_LOADING');
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
      } catch (error) {
        alert('Can\'t download pearson');
      }
    },
    async fetchFilmography({ commit }, id) {
      try {
        const { data } = await axios.get(
          `${apiURL}/person/${id}/combined_credits`,
          {
            params: {
              api_key: apiKey,
              language: apiLang
            }
          }
        );
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
        commit('SET_LOADING');
      } catch (error) {
        alert('Can\'t download Filmography');
      }
    }
  }
};
