import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    totalSearchedPages: 0,
    searchedMovies: []
  },
  getters: {
    searchedMovies(state) {
      return state.searchedMovies;
    },
    totalSearchedPages(state) {
      return state.totalSearchedPages;
    }
  },
  mutations: {
    setMovies(state, { searched, page }) {
      Vue.set(state.searchedMovies, page, searched);
    },
    setTotalPages(state, total) {
      state.totalSearchedPages = total;
    },

    removePreviosResult(state) {
      state.searchedMovies = [];
    }
  },
  actions: {
    async fetchMovies({ commit }, { query, page, region, year }) {
      const searched = await axios.get(`${apiURL}/search/movie`, {
        params: {
          api_key: apiKey,
          language: apiLang,
          query,
          page,
          include_adult: false,
          region,
          year: Number(year)
        }
      });
      commit('setMovies', {
        searched: searched.data.results.map(item => ({
          id: item.id,
          title: item.title,
          genreIds: item.genre_ids,
          posterPath: item.poster_path,
          releaseDate: item.release_date,
          voteAverage: item.vote_average
        })),
        page
      });
      commit('setTotalPages', searched.data.total_pages);
    }
  }
};
