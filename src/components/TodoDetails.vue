<template>
  <div class="todo-item__details">
    <div>
      {{ item.startDate ? 'Start date: ' + item.startDate : 'No start date' }}
    </div>
    <div>
      {{ item.deadline ? 'Deadline date: ' + item.deadline : 'No deadline' }}
    </div>
    <p>{{ item.details ? item.details : 'No details' }}</p>
  </div>
</template>

<script>
export default { name: 'TodoDetails', props: ['item'] };
</script>

<style lang="scss" scoped>
.todo-item__details {
  display: block;
  text-align: left;
  margin: 10px;
  padding: 10px;
  border: 1px solid lightcoral;
  border-radius: 5px;
}
</style>
