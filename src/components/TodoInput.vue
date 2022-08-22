<template>
  <div>
    <input
      :value="value"
      type="text"
      class="input"
      placeholder="type your plan title here"
      @input="$emit('input', $event.target.value)"
    />    
  </div>
</template>

<script>
export default {
  name:'TodoInput',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
};
</script>

<style scoped>
input[type="text"] {
  height: 30px;
  width: 450px;
  border-radius: 15px;
  border: #66bfbf solid 1px;
  padding-left: 10px;
  color: #66bfbf;
  margin-bottom: 10px;
}

input[type="text"]::placeholder{
  color: #91aaaa9d;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

input[type="text"]:hover, input[type="text"]:focus {
  outline-offset: none;
  outline: none;
  box-shadow: 0px 0px 7px 0px #66bfbf8f;
}


</style>