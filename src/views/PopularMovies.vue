<template>
  <div>
    <movies-list
      :totalPages="500"
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
      page: Number(this.$route.query.page)
    };
  },
  components: { MoviesList },
  props: { menuOpen: { type: Boolean, required: true } },
  computed: {
    ...mapGetters('resultsList', ['searchedList'])
  },
  methods: {
    ...mapActions('resultsList', ['fetchPopular']),
    ...mapMutations('resultsList', ['removePreviosResult']),
    async choosePage(page) {
      this.page = page;
      this.$router.push({ path: '/popular', query: { page: this.page } });
      await this.fetchPopular(this.page);
    }
  },
  async mounted() {
    this.removePreviosResult();
    await this.fetchPopular(this.page);
  },
  async beforeRouteUpdate(to, from, next) {
    if (Number(to.query.page) === 1) {
      await this.fetchPopular(1);
      this.page = 1;
    }
    next();
  }
};
</script>
