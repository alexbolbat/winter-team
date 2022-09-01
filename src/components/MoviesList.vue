<template>
  <div>
    <span>
      <v-pagination
        :value="page"
        :length="500"
        :total-visible="7"
        class="mb-7"
        @input="choosePage"
      />
    </span>
    <v-container class="d-flex flex-wrap justify-space-between">
      <movie-list-item
        v-for="item in movies"
        :key="item.id"
        :item="item"
      />
    </v-container>
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
