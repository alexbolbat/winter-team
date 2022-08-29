<template>
  <div id="app">
    <the-header />
    <br />
    <router-view />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue';

export default {
  components: {
    TheHeader
  }
};
</script>
