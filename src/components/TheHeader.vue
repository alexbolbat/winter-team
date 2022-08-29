<template>
  <div>
    <v-toolbar 
      height="80"
    >
      <v-toolbar-title class="text-uppercase">
        <a href="/">
          <img 
            src="../assets/Logo.svg" 
            alt="logo"
          />
        </a>
      </v-toolbar-title>
      <v-spacer />
      <!-- <v-text-field
        v-model="queryValue"
        label="find your film"
        solo
        hide-details="auto"
      /> -->
      <input
        v-model="queryValue" 
        type="text" 
        class="inputField"
        placeholder="find your film here"
      />
      <v-btn
        height="35px"
        small
        @click="queryInput"
      >
        Search
      </v-btn>
    </v-toolbar>
    
    <img 
      class="banner" 
      src="../assets/main page banner.svg" 
    />
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      queryValue: ''
    };
  },
  methods: {
    queryInput() {
      this.$router.push({ name: 'search', query: { keywords: this.queryValue } });
      this.queryValue = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.theme--light.v-toolbar.v-sheet {
    background-color: #6bc5da;
};
.theme--light.v-btn.v-btn--has-bg {
  margin-left: -10px;
  color: #ffffff;
  background-color: #22748c;
  box-shadow: none;
  border: 1px solid #22748c;
}
.theme--light.v-btn.v-btn--has-bg:hover {
    background-color: #a2dfec;
    opacity: 1;
    color: #22748c;
    transition: ease-in 0.25s;
}

.v-sheet.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: none;
}

.inputField{
  height: 35px;
  background-color: #ffffff;
  width: 450px;
  padding-left: 5px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  color:#6bc5da;
  border: 1px solid #22748c;
}

input[type="text"]:hover, input[type="text"]:focus {
  outline-offset: none;
  outline: none;
}

input[type="text"]::placeholder{
  color: #6bc6dab7;
}
.banner{
  margin-top: 5px;
  display: block;
  margin-left: auto;
  margin-right: auto
}
</style>