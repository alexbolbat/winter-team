<template>
  <div>
    <ul
      v-if="todoList.length"
      class="todo-list"
    >
      <todo-item
        v-for="(item, index) of todoList"
        :key="item.id"
        :item="item"
        :index="index"
        :removeTodo="removeTodo"
        :changeCompleted="changeCompleted"
      >
        <template v-slot:default>
          <button @click.stop="removeTodo(item.id)">
            Remove
          </button>
        </template>
      </todo-item>
    </ul>
    <p v-else>
      No todos
    </p>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';
export default {
  name: 'TodoList',
  components: { TodoItem },
  props: ['todoList', 'removeTodo', 'changeCompleted']
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
