<template>
  <v-container 
    class="mt-2 mb-6 pa-4 rounded"
  >
    <v-row>
      <v-col cols="4">
        <v-img
          v-if="tvDetails.posterPath"
          max-width="350px"
          :src="`${apiImg}/${tvDetails.posterPath}`"
        />
        <img 
          v-else
          width="350px"
          src="../assets/not-found.svg"
        />
      </v-col>
      <v-col cols="8">
        <h1 class="display-3 font-weight-medium">
          {{tvDetails.name}}
        </h1>
        <h2
          class="mb-2 font-weight-light display-1"
        >
          {{tvDetails.tagline}}
        </h2>
        <h3 class="font-weight-regular mb-2">
          In air from: {{new Date(tvDetails.inAir).getFullYear()}}
          <br />
          Status: {{tvDetails.status}}
          <br />
          Seasons: {{tvDetails.seasons}}
          <br />
          Episodes: {{tvDetails.episodes}}
          <br />
          Genres: {{
            tvDetails.genreIds
              ?tvDetails.genreIds
                .map(item => item.name)
                .join(', ').toLowerCase()
              : 'No genres'
          }}
        </h3>
        <v-rating
          :value="tvDetails.voteAverage /2"
          readonly
          half-increments
          color="#1a5769"
          background-color="#1a5769"
          size="25"
        />
        <span class="font-weight-bold title">
          {{tvDetails.voteAverage&&tvDetails.voteAverage.toFixed(1)}}
        </span> 
        <p class="pr-10 mt-2 text-justify">
          {{tvDetails.overview}}
        </p>
      </v-col>
    </v-row>
    <v-row
      class="mb-4"
    >
      <v-slide-group
        :key="tvDetails.id"
        class="rounded mx-2"
      >
        <cast-component 
          v-for="item in castDetails"
          :key="item.id"
          :item="item"
        />
      </v-slide-group>
    </v-row>
  </v-container>
</template>

<script>
import { apiImg } from '../config/apiConfig';
import castComponent from './castComponent.vue';

export default {
  data() {
    return { 
      apiImg,
    };
  },
  components: { castComponent },
  computed: {
    tvDetails() {
      return this.$store.getters['tvDetails/tv'];
    },
    castDetails() {
      return this.$store.getters['tvCast/cast'];
    }
  },
  mounted() {
    this.$store.dispatch('tvDetails/fetchTV', this.$route.params.id);
    this.$store.dispatch('tvCast/fetchCast', this.$route.params.id);
  }
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