<template>
  <div v-if="movies.length">
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
    v-else-if="!isLoading"
    class="d-flex flex-wrap justify-space-between pa-0 pt-3 text-h2"
  >
    {{ 'No results' }}
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

<style scoped>
@media (min-width: 960px) {
  .container {
    max-width: 1170px;
  }
}
</style>
