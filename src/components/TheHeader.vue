<template>
  <div>
    <h2><a href="/">Home</a></h2>
    <input v-model="queryValue" type="text" class="searchInput"  />
    <button @click="queryInput">Search</button>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      queryValue: ''
    }
  },
  methods: {
    queryInput() {
      this.$router.push({ name: 'search', query: { keywords: this.queryValue } });
      this.queryValue = ''
    }
  }
}
</script>