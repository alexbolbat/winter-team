<template>
  <div
    v-show="!menuOpen"
    v-if="movies.length && !isLoading"
  >
    <v-container class="movie-list d-flex flex-wrap  pa-0 pt-3">
      <movie-list-item
        v-for="item in movies"
        :key="item.id"
        :item="item"
        :width="cardWidth"
      />
    </v-container>
    <v-pagination
      :value="page"
      :length="totalPages"
      :total-visible="6"
      class="mb-7"
      @input="choosePage"
    />
  </div>

  <v-container
    v-else-if="isLoading"
    class="movie-list d-flex flex-wrap  pa-0 pt-3 text-h2"
  >
    <v-skeleton-loader
      v-for="i in 8"
      :key="i"
      :width="cardWidth"
      height="495"
      type="image, article"
    />
  </v-container>
  <v-container
    v-else-if="!isLoading"
    class="d-flex flex-column align-center pa-0 pt-3"
  >
    <img
      class="mt-3"
      width="100%"
      height="337"
      src="../assets/no-results.svg"
      alt="no-results"
    />
    <div class="text-h3 font-weight-bold mt-2">
      Oops!
    </div>
    <p class="text-h5 mt-4 error-text">
      Sorry, we can`t find the film you are searching for but you always can
      come back to main page
    </p>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import MovieListItem from './MovieListItem.vue';

export default {
  name: 'MoviesList',
  props: {
    totalPages: { type: Number, required: true },
    movies: { type: Array, required: true },
    page: { type: Number, required: true },
    menuOpen: { type: Boolean, required: true }
  },
  components: { MovieListItem },
  methods: {
    choosePage(page) {
      this.$emit('choose-page', Number(page));
    }
  },
  computed: {
    ...mapGetters('resultsList', ['isLoading']),
    cardWidth() {
      switch (this.$vuetify.breakpoint.name) {
      case 'xs':
      case 'sm':
        return 342;
      case 'md':
      case 'lg':
      case 'xl':
      default:
        return 242;
      }
    }
  }
};
</script>

<style>

.v-skeleton-loader__image {
  height: 317px;
}
.error-text {
  max-width: 575px;
  text-align: center;
}
.movie-list{
	justify-content: space-between;
}
@media (min-width: 960px) {
  .container {
    max-width: 1170px;
  }
}
@media (max-width: 1060px) {
	.v-skeleton-loader{
	margin-right: 15px;
    margin-left: 15px;
}.movie-list{
	justify-content: space-around;
}
}
</style>
