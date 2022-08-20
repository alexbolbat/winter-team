<template>
  <li>
    <input 
      :id="item.id" 
      :value="item.value"
      type ="checkbox" 
      @input="$emit('input', $event.target.checked)"
    />
    <label 
      :for="item" 
      @click="isDescriptionVisible = !isDescriptionVisible"
    >
      {{item.value}}
    </label>
    <div class="inputField">
      <slot name="inputField"/>
    </div>
    <div class="deadlineDate">
      <slot name="deadlineDate"/>
    </div>
    <a href="#" @click="$emit('delete', item.id)"><img src="../assets/delete.png" height="15px"></a>
    <p v-show="isDescriptionVisible && item.description">
      <span>Details:</span> {{item.description}}
    </p>
  </li>
</template>

<script>
export default {
  data() {
    return {
      isDescriptionVisible: false,
    }
  } ,
  name: 'TodoListItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
input[type="checkbox"]:checked + label {
    text-decoration: line-through;
    color: #91aaaa;
}

input[type="checkbox"]:checked{
    filter: brightness(126%) hue-rotate(328deg) saturate(86%) contrast(177%);   
}

input[type="checkbox"]:focus-visible {
    outline-offset: none;
}

label {
  margin-left: 10px;
  margin-right: 5px;
}

p {
  border-radius: 15px;
  border: #66bfbf dashed 1px;
  background-color: #91aaaa2a;
  word-wrap: break-word;
  word-break: break-all;
  padding: 10px;
}

p span {
  font-weight: bold;
}

.inputField, .deadlineDate {
  display: inline;
}
.inputField input{
  border-radius: 15px;
  border: #66bfbf dashed 1px;
  width: 120px;
  margin: 10px;
  padding-right: 10px;
  padding-left: 10px;
}

.deadlineDate input {
  border-radius: 15px;
  border: #66bfbf dashed 1px;
  color:#66bfbf;
  padding-right: 5px;
  padding-left: 8px;
  margin-right: 15px;
}

.inputField input:focus, .inputField input:hover, 
.inputField input:focus-visible, .deadlineDate input:focus, 
.deadlineDate input:hover, .deadlineDate input:focus-visible{
    outline-offset: none;
    outline: none;
}
</style>
