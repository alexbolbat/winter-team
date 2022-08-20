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
				@click="addItem"
			>
				Add
			</button> 
		</div> 
		<ul>
			<TodoListItem
				v-for="item in list"
				v-model="item.selected"
				:key="item.id"
				:item="item"
				@delete="deleteItem"
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

let nextTodoId = 1

export default {
	name: 'TodoList',
	components: {
		TodoInput, TodoListItem, TodoTextArea
	},
	data() {
		return {
			inputValue: '',
			textAreaValue: '',
			list: [
				{value: 'abc', selected: false, id: nextTodoId++, description: 'hello world'},
				{value: 'zxc', selected: false, id: nextTodoId++, description: 'hello world1'},
				{value: 'asd', selected: false, id: nextTodoId++, description: 'hello world2'},
				{value: '123', selected: false, id: nextTodoId++, description: 'hello world3'}	
			]
		}
	},
	methods: {
		deleteItem(idDelete) {
			this.list = this.list.filter( item => {
				return item.id !== idDelete
			})
		},
		addItem() {
			if(!this.inputValue.length) {
				return;
			}
			this.list.push({value: this.inputValue, selected: false, id: nextTodoId++, description: this.textAreaValue}),
			this.inputValue = '',
			this.textAreaValue =''
		}
	},
	computed: {
        selectedItems(){ 
          return this.list.filter(item => item.selected)
        },
        changeTitle() {
          if(this.selectedItems.length == this.list.length) {
			return 'green'
			}else if (this.selectedItems.length >= this.list.length / 2 && this.list.length !=0 ) {
				return 'yellow'
			}else{
				return 'red'
			}
        }
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
    font-size: 40px;
}

.header {
    margin: 20px;
}

ul {
    list-style-type: none;
    padding: 0px;
}
</style>