import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    popularMovies:[]
  },
  getters: {
    popularMovies(state){
      return state.popularMovies.flat();
    }
  },
  mutations: { 
    setMovies(state, { popular,page }){
      state.popularMovies = [...state.popularMovies, page,popular] ;
    },
  },
  actions:{
    async fetchPopular({ commit }, page ){
      const popular = await axios.get(`${apiURL}/movie/popular`,
        { params:{ api_key:apiKey,
          page,
          language:apiLang } });
    
      commit('setMovies',{ popular:popular.data.results.map(item=>( { id: item.id,
        title:item.title,
        overview:item.overview,
        backdropPath: item.backdrop_path,
        genreIds: item.genre_ids,
        posterPath:item.poster_path,
        releaseDate:item.release_date,
        voteAverage:item.vote_average
      })),
      page }) ;
      
    },
  },
};
 
