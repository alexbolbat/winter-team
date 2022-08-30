<template>
  <div>
    <v-container class="d-flex flex-wrap justify-center">
      <movie-list-item
        v-for="item in popularMovies[page]"
        :key="item.id"
        :item="item"
      />
    </v-container>
    <span @click="choosePage">
      <v-pagination
        v-model="page"
        :length="500"
        :total-visible="7"
        class="mb-7"
      />
    </span>
  </div>
</template>

<script>
import MovieListItem from '../components/MovieListItem.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      page: Number(this.$route.query.page)
    };
  },
  components: {
    MovieListItem
  },
  computed: {
    ...mapGetters('popularMovies', ['popularMovies'])
  },
  methods: {
    ...mapActions('popularMovies', ['fetchPopular']),
    async choosePage() {
      this.$router.push({ path: '/popular', query: { page: this.page } });
      await this.fetchPopular(this.page);
    }
  },
  async mounted() {
    await this.fetchPopular(this.page);
  },
  async beforeRouteUpdate(to, from, next) {
    to.query.page === 1 && (this.page = 1);
    next();
  }
};
</script>
