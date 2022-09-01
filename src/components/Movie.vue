<template>
  <v-container 
    class="mt-2 pa-4 rounded"
  >
    <v-row>
      <v-col cols="4">
        <v-img
          max-width="350px"
          :src="`${apiImg}/${movieDetails.posterPath}`"
        />
      </v-col>
      <v-col cols="8">
        <h1 class="display-3 font-weight-medium">
          {{movieDetails.title}}
        </h1>
        <h2
          class="mb-2 font-weight-light display-1"
        >
          {{movieDetails.tagline}}
        </h2>
        <h3 class="font-weight-regular mb-2">
          Year: {{new Date(movieDetails.releaseDate).getFullYear()}}
          <br />
          Genres: {{movieDetails.genreIds.map(item => item.name).join(', ').toLowerCase()}}
        </h3>
        <v-rating
          :value="movieDetails.voteAverage /2"
          readonly
          color="#1a5769"
          background-color="#1a5769"
          size="25"
        />
        <span class="font-weight-bold title">
          {{movieDetails.voteAverage.toFixed(1)}}
        </span> 
        <p class="pr-10 mt-2 text-justify">
          {{movieDetails.overview}}
        </p>
      </v-col>
    </v-row>
    <v-row
      class="mb-4"
    >
      <v-slide-group>
        <v-card
          v-for="item in castDetails"
          :key="item.id"
          :item="item"
          max-width="230px"
          class="ma-4 rounded"
          @click="personID(item.id)"
        >
          <v-img
            max-width="auto"
            max-height="280px"
            :lazy-src="`${apiImg}/${item.profilePath}`"
            :src="`${apiImg}/${item.profilePath}`"
          />
          <v-card-text
            class="font-weight-bold text-center text-truncate"
          >
            {{item.name}}
            <br />
            <span
              class="font-weight-light caption text-center"
            >
              {{item.character}}
            </span>
          </v-card-text>
        </v-card>
      </v-slide-group>
    </v-row>
  </v-container>
</template>

<script>
import { apiImg } from '../config/apiConfig';

export default {
  data() {
    return { apiImg };
  },
  computed: {
    movieDetails() {
      return this.$store.getters['movieDetails/movie'];
    },
    castDetails() {
      return this.$store.getters['movieCast/cast'];
    }
  },
  methods: {
    personID(id) {
      this.$router.push({ path: '/person/' + id });
      this.$store.dispatch('personDetails/fetchPerson', id);
      this.$store.dispatch('personFilmography/fetchFilmography', id);
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