<template>
  <form
    class="todo-form"
    @submit.prevent="onSubmit"
  >
    <b>Title:</b>
    <input
      v-model.trim="title"
      type="text"
    />
    <b>Details:</b>
    <textarea
      v-model.trim="description"
      maxlength="150"
      cols="30"
      rows="5"
    />
    <span>
      <button type="submit">
        Add todo
      </button>
    </span>

    <slot
      :startDate="startDate"
      :setStart="setStart"
      name="start"
    />
    <slot
      :deadline="deadline"
      :setDeadline="setDeadline"
      name="deadline"
    />
  </form>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'TodoForm',
  data() {
    return {
      id: 0,
      title: '',
      description: '',
      startDate: '',
      deadline: ''
    };
  },
  methods: {
    ...mapMutations(['addTodo']),
    onSubmit() {
      this.addTodo({
        id: Date.now(),
        title: this.title,
        description: this.title,
        startDate: this.startDate,
        deadline: this.deadline
      });
      this.title = '';
      this.description = '';
      this.startDate = '';
      this.deadline = '';
    },
    setStart(start) {
      this.startDate = start;
    },
    setDeadline(deadline) {
      this.deadline = deadline;
    }
  }
};
</script>

<style lang="scss" scoped>
textarea,
input {
  margin-bottom: 10px;
}
.todo-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}
</style>
