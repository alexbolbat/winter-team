<template>
  <div>
    <ul
      v-if="todos.length"
      class="todo-list"
    >
      <todo-item
        v-for="(item, index) of todos"
        :key="item.id"
        :item="item"
        :index="index"
      />
    </ul>
    <p v-else>
      No todos
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TodoItem from './TodoItem.vue';

export default {
  name: 'TodoList',
  components: { TodoItem },
  computed: mapGetters(['todos'])
};
</script>

<style lang="scss" scoped>
.todo-list {
  width: 900px;
  margin: 0 auto;
  margin-top: 10px;
  border: 1px solid lightblue;
  border-radius: 3px;
}
</style>
