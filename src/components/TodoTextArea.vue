<template>
  <div>
    <textarea 
      :value="value"
      :maxlength="max"
      class="textArea" 
      placeholder="max 150 characters"
      cols="20" 
      rows="2"
      @input="$emit('input', $event.target.value)"
    />    
  </div>
</template>

<script>
export default {
  name:'TodoTextArea',
  data() {
    return {
      max: 150
    };
  },
  props: {
    value: {
      type: String,
      default: ''
    },
  },

};
</script>

<style scoped>
textarea {
    border-radius: 15px;
    border: #66bfbf solid 1px;
    padding-left: 10px;
    color: #66bfbf;
    width: 450px;
    height: 50px;
}

textarea::placeholder{
    color: #91aaaa9d;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    padding-top: 5px;
}

textarea:hover, textarea:focus {
    outline-offset: none;
    outline: none;
    box-shadow: 0px 0px 7px 0px rgba(102,191,191,0.56);
}

</style>