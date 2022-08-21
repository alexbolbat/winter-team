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
      <button type="submit">Add todo</button>
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
export default {
  name: 'TodoForm',
  data() {
    return {
      title: '',
      description: '',
      startDate: '',
      deadline: ''
    };
  },
  methods: {
    onSubmit() {
      this.$emit('add-todo', {
        id: Date.now(),
        title: this.title,
        details: this.description,
        startDate: this.startDate,
        deadline: this.deadline,
        completed: false
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
