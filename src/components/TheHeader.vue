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
      <v-select
        class="select ma-0 pa-0 mr-4"
        :items="isoCodes"
        :value="isRegion"
        item-text="name"
        item-value="iso"
        label="Filter by regions"
        persistent-hint
        single-line
        hide-details
        @change="onRegion"
      />
      <v-select
        class="select ma-0 pa-0 mr-4"
        :value="isYear"
        :items="years"
        item-text="name"
        item-value="value"
        label="Filter by years"
        persistent-hint
        single-line
        hide-details
        @change="onYear"
      />
      <v-checkbox
        v-show="!year"
        v-model="multisearch"
        :value="isMulti"
        class="pr-5"
        label="Multisearch"
        hide-details
        persistent-hint
        single-line
      />
      <input
        :value="queryValue"
        type="text"
        class="inputField rounded pl-1"
        placeholder="find your film here"
        @input="onQuery"
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
import { isoCodes } from '../config/isoCodes';
import { years } from '../config/years';
export default {
  name: 'TheHeader',
  data() {
    return {
      queryValue: '',
      multisearch: this.isMulti,
      isoCodes,
      years,
      region: '',
      year: ''
    };
  },

  methods: {
    ...mapMutations('searchMovies', ['removePreviosResult']),
    ...mapMutations('multisearch', ['removePreviosResult']),
    queryInput() {
      this.removePreviosResult();

      if (!this.region && this.region !== null) {
        this.region = this.isRegion;
      }
      if (!this.multisearch) {
        this.multisearch = this.isMulti;
      }
      const query = {
        page: 1,
        keywords: this.queryValue,
        multisearch: this.multisearch || false
      };
      if (this.region) {
        query.region = this.region;
      }
      if (this.year) {
        query.year = this.year;
        query.multisearch = false;
      }

      if (this.queryValue.trim()) {
        this.$router.push({
          path: '/search',
          query
        });
      }
      this.queryValue = '';
    },
    onRegion(e) {
      this.region = e;
    },
    onYear(e) {
      this.multisearch = false;
      this.year = e;
    },
    onQuery(e) {
      if (!this.year && this.year !== null) {
        this.year = this.isYear;
      }
      this.queryValue = e.target.value;
    }
  },
  computed: {
    isMulti() {
      return this.$route.query.multisearch === 'true';
    },
    isYear() {
      return this.$route.query.year;
    },
    isRegion() {
      return this.$route.query.region;
    }
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
  width: 300px;
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
.select {
  max-width: 150px;
}
</style>
