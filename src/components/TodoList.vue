<template>
	<div>
		<div class="header">
			<img src="../assets/evaluation.png" height="45px" alt="todo" id="logo"/>
			<h1 :class="changeTitle">TODO List</h1>
		</div>
		<div>
			<TodoInput
				v-model="inputValue"
			/>
			<TodoTextArea
				v-model="textAreaValue"
			/>
			<button 
				class="addButton"
				@click="addItem(inputValue, textAreaValue)"
			>
				Add
			</button> 
		</div> 
		<ul>
			<TodoListItem
				v-for="item in listHistory"
				v-model="item.selected"
				:key="item.id"
				:item="item"
				@delete="deleteItem(item.id)"
				@edit="editItem(item.id)"
			>
				<template v-slot:inputField>
					<input/>
				</template>

				<template v-slot:deadlineDate>
					<input type="date"/>
				</template>

			</TodoListItem>
		</ul>
	</div>
</template>

<script>
import TodoListItem from './TodoListItem.vue'
import TodoInput from './TodoInput.vue'
import TodoTextArea from './TodoTextArea.vue'

export default {
	name: 'TodoList',
	
	components: {
		TodoInput, TodoListItem, TodoTextArea
	},
	data() {
		return {
			inputValue: '',
			textAreaValue: ''
		}
	},
	methods: {
		editItem(id) {
			this.$store.dispatch('editItem', id)
			let newInputValue = this.$store.list.find(item => item.id === id)
			this.inputValue = newInputValue.value;
			this.textAreaValue = newInputValue.description
		},
		deleteItem(id) {
			this.$store.dispatch('removeItem', id)
		},
		addItem(inputValue, textAreaValue) {
			if(!this.inputValue.length) {
				return;
			}
			this.$store.dispatch('addItem', {inputValue, textAreaValue}),
			this.inputValue = '',
			this.textAreaValue =''
		}
	},
	computed: {
        selectedItems(){ 
          return this.listHistory.filter(item => item.selected)
        },
        changeTitle() {
          if(this.selectedItems.length == this.listHistory.length) {
			return 'green'
			}else if (this.selectedItems.length >= this.listHistory.length / 2 && this.listHistory.length !=0 ) {
				return 'yellow'
			}else{
				return 'red'
			}
        },
		listHistory() {
			return this.$store.getters.getListHistory
		},
    }
}
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