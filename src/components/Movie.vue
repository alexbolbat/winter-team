<template>
  <v-container 
    class="mt-2 pa-4 rounded"
  >
    <v-row>
      <v-col cols="4">
        <v-img
          max-width="350px"
          :src="`${apiImg + choosedMovie.movie.choosed.posterPath}`"
        />
      </v-col>
      <v-col cols="8">
        <h1 class="display-3 font-weight-medium">
          {{choosedMovie.movie.choosed.title}}
        </h1>
        <h2
          class="mb-2 font-weight-light display-1"
        >
          {{choosedMovie.movie.choosed.tagline}}
        </h2>
        <h3 class="font-weight-regular mb-2">
          Year: {{new Date(choosedMovie.movie.choosed.releaseDate).getFullYear()}}
          <br />
          Genres: {{choosedMovie.movie.choosed.genreIds.map(item => item.name).join(', ').toLowerCase()}}
        </h3>
        <v-rating
          :value="choosedMovie.movie.choosed.voteAverage /2"
          :color="colorFilmScore(choosedMovie.movie.choosed.voteAverage)"
          size="25"
        />
        <span class="font-weight-bold title">
          {{choosedMovie.movie.choosed.voteAverage.toFixed(1)}}
        </span> 
        <p class="pr-10 mt-2 text-justify">
          {{choosedMovie.movie.choosed.overview}}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { apiImg } from '../config/apiConfig';

export default {
  data() {
    return { apiImg };
  },
  methods: {
    colorFilmScore(score) {
      if (!score) {
        return null;
      } else if (score <= 4) {
        return 'red';
      } else if (score > 4 && score < 8) {
        return 'orange';
      } else if (score >= 8) {
        return 'green';
      }
      return 'ember';
    }
  },
  computed: {
    choosedMovie() {
      return this.$store.getters['movieDetails/choosedMovie'];
    }
  }
};
</script>

<style scoped>
@media (min-width: 960px) {
  .container {
    max-width: 1170px;
  }
}
.container{
  background-color: #6bc6dad7;
}

.v-rating {
    max-width: 50%; 
    display: inline;
}

h1, h2{
  color: #412631;
}


h3, p, span{
  color: #1a5769;
}
</style>