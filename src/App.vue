<template>
  <div id="app">
    <the-header />
    <router-view />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    TheHeader
  },
  methods:{ 
    ...mapActions('popularMovies',['fetchPopular']),
    ...mapActions('searchMovies',['searchMovies']) 
  },
  async mounted(){
    await this.fetchPopular(1); 
    await this.fetchPopular(2); 
    await this.searchMovies({ query:'Pirates',page:1 });
    await this.searchMovies({ query:'Pirates',page:2 });
  }

};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
