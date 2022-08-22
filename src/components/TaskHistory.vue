<template>
  <ul>
    <li
      v-for="item in listHistory"
      :key="item.id"
      :item="item"
      class="taskHistory"
    >
      <span class="title">
        Title: {{item.value}}
      </span><br />
      <span class="description">
        <b>Description:</b> {{item.description}}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    listHistory() {
      return this.$store.getters.listListHistory;
    },
  }
};
</script>

<style>
ul {
  list-style-type: none;
  padding: 0px;
  justify-content: center;
}

.title{
  font-size: 23px;
  font-weight: bold;
}

.description {
  color: #91aaaa9d;
  word-wrap: break-word;
  word-break: break-all;
}

.taskHistory {
  border: #66bfbf dashed 1px;
  border-radius: 15px;
  margin: 15px;
}
</style>