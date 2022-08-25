import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';

export default {
  state: {
    searchedMovies:[]
  },
  getters: {
    searchedMovies(state){
      return state.searchedMovies;
    }
  },
  mutations: { 
    setMovies(state, searched){
      state.searchedMovies = [ ...state.searchedMovies, ...searched];
    },
 
  },
  actions:{
    async searchMovies({ dispatch }, { query,page } ){
      const searched = await axios.get(`${apiURL}/search/movie`,
        {
          params:{ api_key:apiKey,
            language:apiLang,
            page,
            query,
            include_adult:false } });
      dispatch('filterFields',searched.data.results) ;
    },
    filterFields({ commit }, searched){
      searched = searched.map(item=>( { 
        id: item.id,
        backdropPath: item.backdrop_path,
        genreIds: item.genre_ids,
        overview:item.overview,
        posterPath:item.poster_path,
        releaseDate:item.release_date,
        title:item.title,
        voteAverage:item.vote_average
      }));
      commit('setMovies',searched);
    }
  },
};
 
