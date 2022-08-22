import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: [
      {
        id: 1,
        title: 'buy 2 forks',
        description: '1dasddddd',
        completed: false
      },
      {
        id: 2,
        title: 'sell all tomatos',
        description: '2dasddddd',
        completed: false,
        deadline: '2022-08-10'
      },
      {
        id: 3,
        title: 'visit dantist',
        description: '3dasddddd',
        completed: false,
        startDate: '2022-08-10'
      },
      {
        id: 4,
        title: 'jump as hight as i can',
        description: '4dasddddd',
        completed: false
      }
    ]
  },
  getters: {
    todos(state) {
      return state.todoList;
    },
    completedAmount(state) {
      const amount = state.todoList.filter(item => item.completed).length;
      if (!state.todoList.length) {
        return 'regular';
      } else if (amount < state.todoList.length / 2) {
        return 'red';
      } else if (
        amount >= state.todoList.length / 2 &&
        amount !== state.todoList.length
      ) {
        return 'yellow';
      } else if (amount === state.todoList.length) {
        return 'green';
      }

      return 'regular';
    }
  },
  mutations: {
    addTodo(state, todo) {
      if (todo.title.trim()) {
        state.todoList.push(todo);
      }
    },
    removeTodo(state, id) {
      state.todoList = state.todoList.filter(item => item.id !== id);
    },
    changeCompleted(state, id) {
      state.todoList.forEach(
        todo => todo.id === id && (todo.completed = !todo.completed)
      );
    },
    editTodo(state, { id, newTitle, newDescription }) {
      state.todoList.forEach(
        todo =>
          todo.id === id &&
          (todo.description = newDescription) &&
          (todo.title = newTitle)
      );
    }
  }
});
