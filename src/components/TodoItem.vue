<template>
  <li class="todo-item">
    <div>
      <div class="todo-item__title-container">
        <div>
          <input
            :id="item.id"
            :checked="item.completed"
            type="checkbox"
            @click="changeCompleted(item)"
          />
          <span :class="[{ completed: item.completed }]" @click="onClickTitle">
            {{ index + 1 + ". " + item.title }}
          </span>
        </div>
        <slot />
      </div>
      <todo-details v-show="showDetails" :item="item" />
    </div>
  </li>
</template>

<script>
import TodoDetails from './TodoDetails.vue';
export default {
  name: 'TodoItem',
  data() {
    return { showDetails: false };
  },
  props: ['item', 'index', 'changeCompleted'],
  methods: {
    onClickTitle() {
      this.showDetails = !this.showDetails;
    },
  },
  components: { TodoDetails },
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
</style>
