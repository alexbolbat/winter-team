<template>
  <div class="todo">
    <h1 :class="getCompletedAmount">Todo list</h1>
    <hr />
    <TodoForm @add-todo="addTodo">
      <template v-slot:start="{ startDate, setStart }">
        <b>start date:</b>
        <input
          type="date"
          :value="startDate"
          @input="(e) => setStart(e.target.value)"
        />
      </template>
      <template v-slot:deadline="{ deadline, setDeadline }"
        ><b>deadline date:</b>
        <input
          type="date"
          :value="deadline"
          @input="(e) => setDeadline(e.target.value)"
        />
      </template>
    </TodoForm>
    <TodoList
      :todoList="todoList"
      :removeTodo="removeTodo"
      :changeCompleted="changeCompleted"
    />
  </div>
</template>

<script>
import TodoList from "./TodoList.vue";
import TodoForm from "./TodoForm.vue";
export default {
  name: "TodosPage",
  components: { TodoList, TodoForm },
  data() {
    return {
      todoList: [
        { id: 1, title: "buy 2 forks", details: "1dasddddd", completed: false },
        {
          id: 2,
          title: "sell all tomatos",
          details: "2dasddddd",
          completed: false,
          deadline: "2022-08-10",
        },
        {
          id: 3,
          title: "visit dantist",
          details: "3dasddddd",
          completed: false,
          startDate: "2022-08-10",
        },
        {
          id: 4,
          title: "jump as hight as i can",
          details: "4dasddddd",
          completed: false,
        },
      ],
    };
  },
  methods: {
    addTodo(todo) {
      if (todo.title.trim()) {
        this.todoList.push(todo);
      }
    },
    removeTodo(id) {
      this.todoList = this.todoList.filter((item) => item.id !== id);
    },
    changeCompleted(item) {
      item.completed = !item.completed;
    },
  },
  computed: {
    getCompletedAmount() {
      const amount = this.todoList.filter((item) => item.completed).length;

      if (amount < 1 && this.todoList.length) {
        return "red";
      } else if (
        amount >= this.todoList.length / 2 &&
        amount !== this.todoList.length
      ) {
        return "yellow";
      } else if (amount === this.todoList.length && this.todoList.length) {
        return "green";
      }
      console.log(amount);
      return "regular";
    },
  },
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
