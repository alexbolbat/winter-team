<template>
  <v-app>
    <the-header />
    <br />
    <router-view />
  </v-app>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    TheHeader
  },
  methods: {
    ...mapActions(['fetchGenres'])
  },
  async mounted() {
    await this.fetchGenres();
  }
};
</script>
