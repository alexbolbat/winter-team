<template>
  <div>
    <v-container class="d-flex flex-wrap justify-space-between">
      <movie-list-item
        v-for="item in movies"
        :key="item.id"
        :item="item"
      />
    </v-container>
    <span @click="choosePage">
      <v-pagination
        :value="page"
        :length="500"
        :total-visible="7"
        class="mb-7"
      />
    </span>
  </div>
</template>

<script>
import MovieListItem from './MovieListItem.vue';

export default {
  name: 'MoviesList',
  props: {
    movies: { type: Array, required: true }, // I don`nt know why undefined(((
    page: { type: Number, required: true }
  },
  components: { MovieListItem },
  methods: {
    choosePage(e) {
      if (Number(e.target.innerHTML)) {
        this.$emit('choose-page', Number(e.target.innerHTML));
      } else if (
        e.target.className.includes('v-icon notranslate mdi mdi-chevron-right')
      ) {
        this.$emit('choose-page', this.page + 1);
      } else if (
        e.target.className.includes('v-icon notranslate mdi mdi-chevron-left')
      ) {
        this.$emit('choose-page', this.page - 1);
      }
    }
  }
};
</script>
