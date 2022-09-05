<template>
  <v-container 
    class="mt-2 mb-6 pa-4 rounded"
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
          Genres: {{
            movieDetails.genreIds
              ? movieDetails.genreIds
                .map(item => item.name)
                .join(', ')
                .toLowerCase()
              : 'No genres'
          }}
        </h3>
        <v-rating
          :value="movieDetails.voteAverage /2"
          readonly
          half-increments
          color="#1a5769"
          background-color="#1a5769"
          size="25"
        />
        <span class="font-weight-bold title">
          {{movieDetails.voteAverage&&movieDetails.voteAverage.toFixed(1)}}
        </span> 
        <p class="pr-10 mt-2 text-justify">
          {{movieDetails.overview}}
        </p>
      </v-col>
    </v-row>
    <v-row
      class="mb-4"
    >
      <v-slide-group
        :key="movieDetails.id"
        class="rounded mx-2"
      >
        <v-card
          v-for="item in castDetails"
          :key="item.id"
          :item="item"
          max-width="230px"
          class="ma-4 rounded"
          @click="personID(item.id)"
        >
          <v-img
            v-if="item.profilePath"
            max-width="auto"
            max-height="280px"
            :src="`${apiImg}/${item.profilePath}`"
          />
          <img
            v-else
            height="280px"
            src="../assets/not-found.svg"
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
    },
  },
  methods: {
    personID(id) {
      this.$store.commit('personDetails/RESET_STATE');
      this.$store.commit('movieDetails/RESET_STATE');
      this.$router.push({ path: '/person/' + id });
    }
  },
  async mounted() {
    await this.$store.dispatch('movieDetails/fetchMovie', this.$route.params.id);
    await this.$store.dispatch('movieCast/fetchCast', this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
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

.v-item-group {
    background-color: #1a576980;
    max-width: 1145px;
}
</style>