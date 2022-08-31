<template>
  <div>
    <movies-list
      :page="page"
      :movies="popularMovies[page]"
      @choose-page="choosePage"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MoviesList from './MoviesList.vue';
export default {
  data() {
    return {
      page: Number(this.$route.query.page)
    };
  },
  components: { MoviesList },
  computed: {
    ...mapGetters('popularMovies', ['popularMovies'])
  },
  methods: {
    ...mapActions('popularMovies', ['fetchPopular']),
    async choosePage(page) {
      this.page = page;
      this.$router.push({ path: '/popular', query: { page: this.page } });
      await this.fetchPopular(this.page);
    }
  },
  async mounted() {
    await this.fetchPopular(this.page);
  },
  async beforeRouteUpdate(to, from, next) {
    if (to.query.page === 1) {
      this.page = 1;
    }
    next();
  }
};
</script>
