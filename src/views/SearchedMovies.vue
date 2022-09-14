<template>
  <div>
    <movies-list
      :totalPages="totalPages"
      :page="page"
      :movies="searchedList[page] || []"
      :menuOpen="menuOpen"
      @choose-page="choosePage"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
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
    ...mapGetters('resultsList', ['searchedList', 'totalPages'])
  },
  props: { menuOpen: { type: Boolean, required: true } },
  methods: {
    ...mapActions('resultsList', ['fetchMovies', 'fetchMultisearch']),
    ...mapMutations('resultsList', ['removePreviosResult']),
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
      const payload = {
        page: this.page,
        query: this.keywords
      };
      if (this.isMultisearch === 'true') {
        if (this.region) {
          payload.region = this.region;
        }
        await this.fetchMultisearch(payload);
      } else {
        if (this.region && !this.year) {
          payload.region = this.region;
        } else if (this.year && !this.region) {
          payload.year = this.year;
        } else if (this.region && this.year) {
          payload.region = this.region;
          payload.year = this.year;
        }
        await this.fetchMovies(payload);
      }
    }
  },
  async mounted() {
    this.removePreviosResult();
    this.getPage();
  },
  async beforeRouteUpdate(to, from, next) {
    const { query } = to;
    this.page = Number(query.page);
    this.keywords = query.keywords;
    this.isMultisearch = query.multisearch;
    this.region = query.region;
    this.year = query.year;
    this.getPage();
    next();
  }
};
</script>
