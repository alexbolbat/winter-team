import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';

export default {
  state: {
    genres: []
  },
  getters: {
    genres(state) {
      return genreIds =>
        state.genres
          .filter(genre => genreIds.find(genreId => genreId === genre.id))
          .map(item => item.name)
          .join(', ');
    }
  },
  mutations: {
    setGenres(state, genres) {
      state.genres = genres;
    }
  },
  actions: {
    async fetchGenres({ commit }) {
      const genres = await axios.get(`${apiURL}/genre/movie/list`, {
        params: { api_key: apiKey, language: apiLang }
      });

      commit('setGenres', genres.data.genres);
    }
  }
};
