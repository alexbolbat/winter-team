<template>
  <div class="home">
    <todo-list />
  </div>
</template>

<script>
import TodoList from '../components/TodoList.vue';

export default {
  components: {
    TodoList
  }
};
</script>