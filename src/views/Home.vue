<template>
  <div class="todo">
    <h1 :class="completedAmount">
      Todo list
    </h1>
    <hr />
    <todo-form>
      <template v-slot:start="{ startDate, setStart }">
        <b>start date:</b>
        <input
          type="date"
          :value="startDate"
          @input="(e) => setStart(e.target.value)"
        />
      </template>
      <template
        v-slot:deadline="{ deadline, setDeadline }"
      >
        <b>deadline date:</b>
        <input
          type="date"
          :value="deadline"
          @input="(e) => setDeadline(e.target.value)"
        />
      </template>
    </todo-form>
    <todo-list />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TodoList from '../components/TodoList.vue';
import TodoForm from '../components/TodoForm.vue';
export default {
  name: 'Home',
  components: { TodoList, TodoForm },
  computed: mapGetters(['completedAmount']),
};
</script>

<style lang="scss" scoped>
.todo {
  text-align: center;
}

.regular {
  color: black;
}
.red {
  color: red;
}
.green {
  color: green;
}
.yellow {
  color: yellow;
}
</style>
