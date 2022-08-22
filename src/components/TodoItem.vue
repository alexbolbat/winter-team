<template>
  <li class="todo-item">
    <div>
      <div class="todo-item__title-container">
        <div>
          <input
            :id="item.id"
            :checked="item.completed"
            type="checkbox"
            @click="changeCompleted(item.id)"
          />
          <span
            :class="{ completed: item.completed }"
            @click="onClickTitle"
          >
            {{ index + 1 + '. ' + item.title }}
          </span>
        </div>
        <div>
          <button @click.stop="onClickEdit">
            Edit
          </button>
          <button @click.stop="removeTodo(item.id)">
            Remove
          </button>
        </div>
      </div>
      <todo-details
        v-show="showDetails"
        :item="item"
      />
    </div>
    <form
      v-show="showEditor"
      class="edit-popup"
      @submit.prevent="onSubmit"
    >
      <p>Popup</p>
      <input
        v-model="title"
        type="text"
      />
      <textarea
        v-model="description"
        cols="30"
        rows="10"
      />
      <button type="submit">
        Edit
      </button>
    </form>
  </li>
</template>

<script>
import TodoDetails from './TodoDetails.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'TodoItem',
  data() {
    return {
      title: this.item.title,
      description: this.item.description,
      showDetails: false,
      showEditor: false
    };
  },
  props: ['item', 'index'],
  methods: {
    ...mapMutations(['changeCompleted', 'removeTodo', 'editTodo']),
    onClickTitle() {
      this.showDetails = !this.showDetails;
    },
    onClickEdit() {
      this.showEditor = !this.showEditor;
    },
    onSubmit() {
      if (this.title.trim()) {
        this.editTodo({
          id: this.item.id,
          newTitle: this.title,
          newDescription: this.description
        });
        this.showEditor = false;
      }
    }
  },
  components: { TodoDetails }
};
</script>

<style lang="scss" scoped>
.todo-item {
  margin: 10px;
  padding: 10px;
  border: 1px solid lightgreen;
  border-radius: 5px;
  &__title-container {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;
  }
}
.completed {
  text-decoration: line-through;
}
.edit-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    margin-top: 10px;
  }
}
</style>
