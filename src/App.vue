<template>
  <div id="app">
    <TodosPage />
  </div>
</template>
<script>
import "./components/TodosPage";
import TodosPage from "./components/TodosPage.vue";
export default {
  name: "App",
  components: { TodosPage },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
li,
ul,
p {
  list-style: none;
  margin: 0;
  padding: 0;
}
button {
  height: 40px;
}
</style>
