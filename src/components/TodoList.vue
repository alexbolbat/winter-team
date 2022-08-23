<template>
  <div>
    <div class="header">
      <img
        id="logo"
        src="../assets/evaluation.png"
        height="45px"
        alt="todo"
      />
      <h1 :class="changeTitleColor">
        TODO List
      </h1>
    </div>
    <div>
      <todo-input
        v-model="inputValue"
      />
      <todo-text-area
        v-model="textAreaValue"
      />
      <button
        v-if="isEditActive"
        class="saveButton"
        @click="confirmEdit()"
      >
        Save
      </button>
      <button
        v-else
        class="addButton"
        @click="addItem(inputValue, textAreaValue)"
      >
        Add
      </button> 
    </div> 
    <ul>
      <todo-list-item
        v-for="item in listHistory"
        :key="item.id"
        v-model="item.selected"
        :item="item"
        @delete="deleteItem(item.id)"
        @edit="editItem(item)"
      >
        <template v-slot:inputField>
          <input />
        </template>

        <template v-slot:deadlineDate>
          <input type="date" />
        </template>
      </todo-list-item>
    </ul>
  </div>
</template>

<script>
import TodoListItem from './TodoListItem.vue';
import TodoInput from './TodoInput.vue';
import TodoTextArea from './TodoTextArea.vue';

export default {
  name: 'TodoList',
	
  components: {
    TodoInput, TodoListItem, TodoTextArea
  },
  data() {
    return {
      inputValue: '',
      textAreaValue: '',
      isEditActive: false,
      itemToEditId: '',
    };
  },
  methods: {
    editItem(item) {
      this.isEditActive = true;
      this.inputValue = item.value;
      this.textAreaValue = item.description;
      this.itemToEditId = item.id;
    },
    confirmEdit() {
      const data = { id: this.itemToEditId, value: this.inputValue, description: this.textAreaValue };
      this.$store.dispatch('confirmItem', data);
      this.isEditActive = false;
      this.itemToEditId = false;
      this.inputValue = '',
      this.textAreaValue = '';
    },
    deleteItem(id) {
      this.$store.dispatch('removeItem', id);
    },
    addItem(inputValue, textAreaValue) {
      if(!this.inputValue.length) {
        return;
      }
      this.$store.dispatch('addItem', { inputValue, textAreaValue });
      this.inputValue = '',
      this.textAreaValue = '';
    }
  },
  computed: {
    selectedItems(){ 
      return this.listHistory.filter(item => item.selected);
    },
    changeTitleColor() {
      if(this.selectedItems.length == this.listHistory.length) {
        return 'green';
      }else if (this.selectedItems.length >= this.listHistory.length / 2 && this.listHistory.length != 0 ) {
        return 'yellow';
      }else{
        return 'red';
      }
    },
    listHistory() {
      return this.$store.getters.listListHistory;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.red{
  color: #f76b8a;
}
.yellow{
  color: #f5dc51;
}
.green{
  color:#66bf75;
}

.addButton{
  height: 30px;
  width: 70px;
  border-radius: 15px;
  border: #66bfbf solid 1px;
  cursor: pointer;
  color: #66bfbf;
  background-color: #fcfefe;
	margin-bottom: 20px;
}

.addButton:hover{
  background-color: #66bfbf;
  color: #fcfefe;
  transition: background-color 0.5s ease-out;
  box-shadow: 0px 0px 7px 0px rgba(102,191,191,0.56);
}

.saveButton {
  height: 30px;
  width: 70px;
  border-radius: 15px;
  border: #8ebf66 solid 1px;
  cursor: pointer;
  color: #8ebf66;
  background-color: #fcfefe;
	margin-bottom: 20px;
}

.saveButton:hover {
  background-color: #8ebf66;
  color: #fcfefe;
  transition: background-color 0.5s ease-out;
  box-shadow: 0px 0px 7px 0px #8ebf6686;
}

h1{
  display: inline;
  font-size: 45px;
}

.header {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0px;
}
</style>