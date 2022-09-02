<template>
  <div>
    <movies-list
      :totalPages="
        isMultisearch === 'true' ? totalMultisearchedPages : totalSearchedPages
      "
      :page="page"
      :movies="
        isMultisearch === 'true'
          ? multisearchedResults[page] || []
          : searchedMovies[page] || []
      "
      @choose-page="choosePage"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MoviesList from '../components/MoviesList.vue';
export default {
  name: 'PopularMovies',
  data() {
    return {
      page: Number(this.$route.query.page),
      keywords: this.$route.query.keywords,
      isMultisearch: this.$route.query.multisearch
    };
  },
  components: { MoviesList },
  computed: {
    ...mapGetters('searchMovies', ['searchedMovies', 'totalSearchedPages']),
    ...mapGetters('multisearch', [
      'multisearchedResults',
      'totalMultisearchedPages'
    ])
  },
  methods: {
    ...mapActions('searchMovies', ['fetchMovies']),
    ...mapActions('multisearch', ['fetchMultisearch']),
    async choosePage(page) {
      this.page = page;
      this.$router.push({
        path: '/search',
        query: {
          page: this.page,
          keywords: this.keywords,
          multisearch: this.isMultisearch
        }
      });
    }
  },
  async mounted() {
    console.log(this.totalSearchedPages);
    if (this.isMultisearch === 'true') {
      await this.fetchMultisearch({ page: this.page, query: this.keywords });
    } else {
      await this.fetchMovies({ page: this.page, query: this.keywords });
    }
  },
  async beforeRouteUpdate(to, from, next) {
    this.page = Number(to.query.page);
    this.keywords = to.query.keywords;
    this.isMultisearch = to.query.multisearch;

    if (this.isMultisearch === 'true') {
      await this.fetchMultisearch({ page: this.page, query: this.keywords });
    } else {
      await this.fetchMovies({ page: this.page, query: this.keywords });
    }
    next();
  }
};
</script>
