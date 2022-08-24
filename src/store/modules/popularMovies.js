import { apiKey, apiURL } from '../../config/apiConfig';
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
    filterFields(state,popular){
      popular = popular.map(item=>{ 
        return{ id: item.id,
          backdropPath: item.backdrop_path,
          genreIds: item.genre_ids ,
          overview: item.overview,
          posterPath: item.poster_path,
          releaseDate: item.release_date,
          title: item.title,
          voteAverage: item.vote_average
        };
      });  
      
      state.popularMovies = popular;
    },
  
  },
  actions:{
    async fetchPopular({ commit }, page ){
      const popular = await axios.get(`${apiURL}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`);
      commit('filterFields',popular.data.results);
    }
  },
};
 
