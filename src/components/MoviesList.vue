<template>
  <div>
    <v-container class="d-flex flex-wrap justify-space-between pa-0 pt-3">
      <movie-list-item
        v-for="item in movies"
        :key="item.id"
        :item="item"
      />
    </v-container>
    <v-pagination
      :value="page"
      :length="500"
      :total-visible="7"
      class="mb-7"
      @input="choosePage"
    />
  </div>
</template>

<script>
import MovieListItem from './MovieListItem.vue';

export default {
  name: 'MoviesList',
  props: {
    movies: { type: Array, required: true },
    page: { type: Number, required: true }
  },
  components: { MovieListItem },
  methods: {
    choosePage(page) {
      this.$emit('choose-page', Number(page));
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
</style>
