import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    multisearchResults: []
  },
  getters: {
    multisearchedResults(state) {
      return state.multisearchResults;
    }
  },
  mutations: {
    setMultisearched(state, { searched, page }) {
      Vue.set(state.multisearchResults, page, searched);
    },
    removePreviosResult(state) {
      state.multisearchResults = [];
    }
  },
  actions: {
    async fetchMultisearch({ commit }, { query, page }) {
      console.log('multi');
      const searched = await axios.get(`${apiURL}/search/multi`, {
        params: {
          api_key: apiKey,
          page,
          query,
          language: apiLang,
          include_adult: false
        }
      });
      commit('setMultisearched', {
        searched: searched.data.results.map(item => ({
          id: item.id,
          mediaType: item.media_type,
          title: item.title,
          name: item.name,
          genreIds: item.genre_ids,
          posterPath: item.poster_path,
          profilePath: item.profile_path,
          releaseDate: item.release_date,
          voteAverage: item.vote_average,
          popularity: item.popularity
        })),
        page
      });
    }
  }
};
