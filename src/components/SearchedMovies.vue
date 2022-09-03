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
      isMultisearch: this.$route.query.multisearch,
      year: this.$route.query.year,
      region: this.$route.query.region
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
    },
    async getPage() {
      if (this.isMultisearch === 'true') {
        if (this.region) {
          await this.fetchMultisearch({
            page: this.page,
            query: this.keywords,
            region: this.region
          });
        } else {
          await this.fetchMultisearch({
            page: this.page,
            query: this.keywords
          });
        }
      } else {
        if (this.region && !this.year) {
          await this.fetchMovies({
            page: this.page,
            query: this.keywords,
            region: this.region
          });
        } else if (this.year && !this.region) {
          await this.fetchMovies({
            page: this.page,
            query: this.keywords,
            year: this.year
          });
        } else if (this.region && this.year) {
          await this.fetchMovies({
            page: this.page,
            query: this.keywords,
            region: this.region,
            year: this.year
          });
        } else {
          await this.fetchMovies({ page: this.page, query: this.keywords });
        }
      }
    }
  },
  async mounted() {
    this.getPage();
  },
  async beforeRouteUpdate(to, from, next) {
    this.page = Number(to.query.page);
    this.keywords = to.query.keywords;
    this.isMultisearch = to.query.multisearch;
    this.region = to.query.region;
    this.year = to.query.year;
    this.getPage();
    next();
  }
};
</script>
