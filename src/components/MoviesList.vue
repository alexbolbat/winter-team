<template>
  <div v-if="movies.length && !isLoading">
    <v-container class="d-flex flex-wrap justify-space-between pa-0 pt-3">
      <movie-list-item
        v-for="item in movies"
        :key="item.id"
        :item="item"
      />
    </v-container>
    <v-pagination
      :value="page"
      :length="totalPages"
      :total-visible="7"
      class="mb-7"
      @input="choosePage"
    />
  </div>

  <v-container
    v-else-if="isLoading"
    class="d-flex flex-wrap justify-space-between pa-0 pt-3 text-h2"
  >
    <v-skeleton-loader
      v-for="i in 8"
      :key="i"
      width="242"
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
      width="774"
      height="337"
      src="../assets/no-results.svg"
      alt="no-results"
    />
    <div class="text-h2 font-weight-bold mt-2">
      Oops!
    </div>
    <p class="text-h4 mt-4 error-text">
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
    page: { type: Number, required: true }
  },
  components: { MovieListItem },
  methods: {
    choosePage(page) {
      this.$emit('choose-page', Number(page));
    }
  },
  computed: {
    ...mapGetters('resultsList', ['isLoading'])
  }
};
</script>

<style>
@media (min-width: 960px) {
  .container {
    max-width: 1170px;
  }
}
.v-skeleton-loader__image {
  height: 317px;
}
.error-text {
  width: 575px;
  text-align: center;
}
</style>
