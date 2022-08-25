import { apiKey, apiLang, apiURL } from '../../config/apiConfig';
import axios from 'axios';

export default {
  state: {
    popularMovies:[]
  },
  getters: {
    popularMovies(state){
		
      return state.popularMovies;
    }
  },
  mutations: { 
    setMovies(state,popular){
      console.log('setMovies');
      state.popularMovies = [...state.popularMovies ,...popular] ;
   
    },
  },
  actions:{
    async fetchPopular({ dispatch }, page ){
      console.log('fetchPopular');
      const popular = await axios.get(`${apiURL}/movie/popular`,
        { params:{ api_key:apiKey,
          page,
          language:apiLang } });
    
      dispatch('filterFields',popular.data.results) ;
      
    },
    filterFields({ commit }, popular){
      console.log('filterFields');
      popular = popular.map(item=>( { id: item.id,
        backdropPath: item.backdrop_path,
        genreIds: item.genre_ids,
        overview:item.overview,
        posterPath:item.poster_path,
        releaseDate:item.release_date,
        title:item.title,
        voteAverage:item.vote_average
      }));
      commit('setMovies',popular); 
      
    }
  },
};
 
