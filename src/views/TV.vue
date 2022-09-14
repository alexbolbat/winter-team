<template>
  <v-container
    v-show="!menuOpen"
    class="mt-2 mb-6 pa-4 rounded"
  >
    <v-row>
      <v-col 
        cols="4"
        class="d-none d-sm-block"
      >
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
      <v-col 
        cols="12" 
        sm="8"
      >
        <h1 class="display-2 font-weight-medium">
          {{ tvDetails.name }}
        </h1>
        <h2 class="mb-2 font-weight-light display-1">
          {{ tvDetails.tagline }}
        </h2>
        <h3 class="font-weight-regular mb-2">
          In air from: {{ new Date(tvDetails.inAir).getFullYear() }}
          <br />
          Status: {{ tvDetails.status }}
          <br />
          Seasons: {{ tvDetails.seasons }}
          <br />
          Episodes: {{ tvDetails.episodes }}
          <br />
          Genres:
          {{
            tvDetails.genreIds
              ? tvDetails.genreIds
                .map(item => item.name)
                .join(', ')
                .toLowerCase()
              : 'No genres'
          }}
        </h3>
        <v-rating
          :value="tvDetails.voteAverage / 2"
          readonly
          half-increments
          color="#1a5769"
          background-color="#1a5769"
          size="25"
        />
        <span class="font-weight-bold title">
          {{ tvDetails.voteAverage && tvDetails.voteAverage.toFixed(1) }}
        </span>
        <p class="pr-10 mt-2 text-justify">
          {{ tvDetails.overview }}
        </p>
      </v-col>
    </v-row>
    <h3
      v-if="castDetails"
      class="font-weight-bold headline mx-auto mb-4 text-center"
    >
      Top Billed Cast
    </h3>
    <v-row class="mb-4 justify-center">
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
    <h3
      v-if="tvDetails.seasonsInfo"
      class="font-weight-bold headline mx-auto mb-4 text-center"
    >
      Short seasons overviews
    </h3>
    <v-row
      class="mx-auto justify-center"
    >
      <v-card
        v-for="item in tvDetails.seasonsInfo"
        :key="item.id"
        max-width="540px"
        class="ma-2 seasonItem"
      >
        <v-row
          class="pa-3"
        >
          <v-col 
            cols="4"
            class="d-none d-sm-block"
          >
            <v-img
              v-if="item.poster_path"
              max-width="auto"
              max-height="280px"
              :src="`${apiImg}/${item.poster_path}`"
            />
            <img
              v-else
              width="100%"
              height="280px"
              src="../assets/not-found.svg"
            />
            <h2
              class="text-center review--text"
            >
              {{item.name}}
            </h2>
          </v-col>  
          <v-col 
            cols="12"
            sm="8"
          >  
            <span
              class="d-sm-none font-weight-bold title"
            >
              {{item.name}}
            </span>
            <p
              v-if="item.overview"
              class="review--text"
            >
              {{item.overview}}
            </p>
            <p
              v-if="!item.overview"
              class="review--text"
            >
              We have no more information about this season
            </p>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { apiImg } from '../config/apiConfig';
import CastComponent from '../components/СastComponent.vue';

export default {
  data() {
    return {
      apiImg
    };
  },
  components: { CastComponent }
  ,
  props: { menuOpen: { type: Boolean, required: true } },
  computed: {
    tvDetails() {
      return this.$store.getters['tv/tv'];
    },
    castDetails() {
      return this.$store.getters['tv/cast'];
    }
  },
  mounted() {
    this.$store.dispatch('tv/fetchTV', this.$route.params.id);
    this.$store.dispatch('tv/fetchCast', this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 960px) {
  .container {
    max-width: 1170px;
  }
}

@media (max-width: 600px) {
  .seasonItem {
    width: 98%;
  }
}

.container {
  background-color: #6bc6dad7;
}

.v-rating {
  max-width: 50%;
  display: inline;
}

h1,
h2 {
  color: #412631;
}

h3,
p,
span {
  color: #1a5769;
}

.v-item-group {
  background-color: #1a576956;
  max-width: 98%;
}
</style>
