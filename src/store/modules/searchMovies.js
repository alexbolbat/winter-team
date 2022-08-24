import { apiKey, apiURL } from '../../config/apiConfig';
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
    filterFields(state, searched){
      searched = searched.map(item=>{
        return{ id: item.id,
          backdropPath: item.backdrop_path,
          genreIds: item.genre_ids,
          overview:item.overview,
          posterPath:item.poster_path,
          releaseDate:item.release_date,
          title:item.title,
          voteAverage:item.vote_average
        };
      }); 
      state.searchedMovies =  searched;
    },
 
  },
  actions:{
    async searchMovies({ commit }, { query,page } ){
      const  searched = await axios.get(`${apiURL}/search/movie?api_key=${apiKey}
		&language=en-US&query=${query}
		&page=${page}
		&include_adult=false`);
      commit('filterFields', searched.data.results);
    }
  },
};
 
