<template>
  <div class="task-history">
    <todo-list />
  </div>
</template>

<script>
import TodoList from '../components/TodoList.vue';
export default {
  name: 'TaskHistory',
  components: { TodoList },
};
</script>

<style lang="scss" scoped></style>
