import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: { totalPages: 0, searchedList: [] },
  getters: {
    searchedList(state) {
      return state.searchedList;
    },
    totalPages(state) {
      return state.totalPages;
    }
  },
  mutations: {
    setMovieList(state, { results, page }) {
      Vue.set(state.searchedList, page, results);
    },
    setTotalPages(state, total) {
      state.totalPages = total;
    },
    removePreviosResult(state) {
      state.searchedList = [];
      state.totalPages = 0;
    }
  },
  actions: {
    async fetchPopular({ commit }, page) {
      const popular = await axios.get(`${apiURL}/movie/popular`, {
        params: {
          api_key: apiKey,
          page,
          language: apiLang,
          include_adult: false
        }
      });
      commit('setMovieList', {
        results: popular.data.results.map(item => ({
          id: item.id,
          title: item.title,
          genreIds: item.genre_ids,
          posterPath: item.poster_path,
          releaseDate: item.release_date,
          voteAverage: item.vote_average
        })),
        page
      });
    },
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
      commit('setMovieList', {
        results: searched.data.results.map(item => ({
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
    },
    async fetchMultisearch({ commit }, { query, page, region }) {
      const searched = await axios.get(`${apiURL}/search/multi`, {
        params: {
          api_key: apiKey,
          page,
          query,
          region,
          language: apiLang,
          include_adult: false
        }
      });

      commit('setMovieList', {
        results: searched.data.results.map(item => ({
          id: item.id,
          mediaType: item.media_type,
          title: item.title,
          name: item.name,
          genreIds: item.genre_ids,
          posterPath: item.poster_path,
          profilePath: item.profile_path,
          releaseDate: item.release_date,
          voteAverage: item.vote_average,
          popularity: item.popularity,
          firstAirDate: item.first_air_date
        })),
        page
      });
      commit('setTotalPages', searched.data.total_pages);
    }
  }
};
