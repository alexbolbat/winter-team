<template>
  <v-app>
    <the-header />
    <br />
    <router-view />
  </v-app>
</template>

<script>
import TheHeader from './components/TheHeader.vue';

export default {
  components: {
    TheHeader
  }
};
</script>
