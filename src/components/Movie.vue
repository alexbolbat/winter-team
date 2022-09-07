<template>
  <v-container 
    class="mt-2 mb-6 pa-4 rounded"
  >
    <v-row>
      <v-col cols="4">
        <v-img
          v-if="movieDetails.posterPath"
          max-width="350px"
          :src="`${apiImg}/${movieDetails.posterPath}`"
        />
        <img 
          v-else
          width="350px"
          src="../assets/not-found.svg"
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
        <cast-component 
          v-for="item in castDetails"
          :key="item.id"
          :item="item"
        />
      </v-slide-group>
    </v-row>
    <v-row>
      <v-card
        v-for="item in reviews"
        :key="item.id"
        :item="item"
        class="mb-3 mx-2"
        width="100%"
      >
        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-content>
              <v-list-item-title>
                {{item.author}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-actions>
        <v-card-text class="text-caption font-weight-medium">
          <p 
            v-if="!showAll[item.id]"
            :key="item.id"
          >
            {{(item.content).slice(0, 600)}} 
            <span
              v-if="(item.content).length > 600"
              class="font-weight-bold ml-2 text-uppercase showMore"
              @click="showMore(item.id)"
            >
              ...show full review
            </span>
          </p> 
          <p 
            v-if="showAll[item.id]"
          > 
            {{item.content}} 
          </p>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { apiImg } from '../config/apiConfig';
import CastComponent from './CastComponent.vue';

export default {
  data() {
    return { 
      apiImg,
      showAll: {},
    };
  },
  components: { CastComponent },
  computed: {
    movieDetails() {
      return this.$store.getters['movieDetails/movie'];
    },
    castDetails() {
      return this.$store.getters['movieCast/cast'];
    },
    reviews() {
      return this.$store.getters['movieReviews/reviews'];
    },
  },
  methods: {
    personID(id) {
      this.$store.commit('personDetails/RESET_STATE');
      this.$store.commit('movieDetails/RESET_STATE');
      this.$router.push({ path: '/person/' + id });
    },
    showMore(id) {
      this.$set(this.showAll, id, true);
    },
  },
  async mounted() {
    await this.$store.dispatch('movieDetails/fetchMovie', this.$route.params.id);
    await this.$store.dispatch('movieCast/fetchCast', this.$route.params.id);
    this.$store.dispatch('movieReviews/fetchRewiews', this.$route.params.id);
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

.showMore {
  color: #6bc6da;
  cursor: pointer;
}

</style>