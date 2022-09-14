<template>
  <v-app>
    <the-header
      :menuOpen="menuOpen"
      :switchMenuOpen="switchMenuOpen"
    />
    <router-view :menuOpen="menuOpen" />
  </v-app>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    TheHeader
  },
  data() {
    return { menuOpen: false };
  },
  methods: {
    ...mapActions(['fetchGenres']),
    switchMenuOpen(menuOpen) {
      this.menuOpen = menuOpen;
    }
  },
  async mounted() {
    await this.fetchGenres();
  }
};
</script>
