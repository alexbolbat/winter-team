<template>
  <div>
    <v-toolbar
      height="80"
      color="#6bc5da"
      class="rounded mx-auto"
    >
      <v-toolbar-title class="text-uppercase">
        <router-link to="/">
          <img
            src="../assets/Logo.svg"
            alt="logo"
          />
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-checkbox
        v-model="isMultisearch"
        class="pr-5"
        label="Multisearch"
        hide-details
      />
      <input
        v-model="queryValue"
        type="text"
        class="inputField rounded pl-1"
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

    <v-img
      class="mx-auto mt-2"
      max-width="1170"
      src="../assets/main page banner.svg"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'TheHeader',
  data() {
    return {
      queryValue: '',
      isMultisearch: this.$route.query.multisearch || false
    };
  },

  methods: {
    ...mapMutations('searchMovies', ['removePreviosResult']),
    queryInput() {
      this.removePreviosResult();
      this.$router.push({
        path: '/search',
        query: {
          keywords: this.queryValue,
          page: 1,
          multisearch: this.isMultisearch
        }
      });
      this.queryValue = '';
    }
  },
  updated() {
    console.log(this.$route.query);
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 960px) {
  .theme--light.v-toolbar.v-sheet {
    max-width: 1170px;
  }
}
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
.inputField {
  height: 35px;
  background-color: #ffffff;
  width: 450px;
  color: #6bc5da;
  border: 1px solid #22748c;
}
input[type='text']:hover,
input[type='text']:focus {
  outline-offset: none;
  outline: none;
}
input[type='text']::placeholder {
  color: #6bc6dab7;
}
</style>
