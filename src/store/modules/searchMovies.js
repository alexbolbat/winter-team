import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    searchedMovies: []
  },
  getters: {
    searchedMovies(state) {
      return state.searchedMovies.flat();
    }
  },
  mutations: { 
    setMovies(state, { searched, page }) {
      state.searchedMovies[page - 1] =  searched;
    },
 
  },
  actions: {
    async searchMovies({ commit }, { query, page } ) {
      const searched = await axios.get(`${apiURL}/search/movie`,
        {
          params: { api_key: apiKey,
            page,
            query,
            language: apiLang,
            include_adult: false } });
      commit('setMovies', { searched: searched.data.results.map(item => (
        { id: item.id,
          title: item.title,
          overview: item.overview,
          backdropPath: item.backdrop_path,
          genreIds: item.genre_ids,
          posterPath: item.poster_path,
          releaseDate: item.release_date,
          voteAverage: item.vote_average
        })),
      page }) ;
    },
 
  },
};
 
