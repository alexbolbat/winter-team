<template>
  <div>
    <v-toolbar
      height="80"
      color="header"
      class="rounded mx-auto"
    >
      <v-toolbar-title class="text-uppercase">
        <router-link to="/">
          <img
            v-show="$vuetify.theme.dark"
            src="../assets/LogoDark.svg"
            alt="logo"
          />
          <img
            v-show="!$vuetify.theme.dark"
            src="../assets/LogoLight.svg"
            alt="logo"
          />
        </router-link>
      </v-toolbar-title>
      <v-spacer />

      <div class="nav-desktop ma-0 pa-0 d-flex flex-column align-center">
        <v-row class="ma-0 pa-0">
          <v-switch
            v-model="$vuetify.theme.dark"
            color="white"
            class="ma-0 pa-0 pl-3"
            hint="This toggles the global state of the theme"
            hide-details
            inset
          />
        </v-row>
        <span>Theme</span>
      </div>
      <v-spacer />
      <v-autocomplete
        v-model="region"
        class="select nav-desktop ma-0 pa-0 mr-4"
        :items="isoCodes"
        item-text="name"
        item-value="iso"
        label="Filter by regions"
        persistent-hint
        single-line
        hide-details
      />
      <v-autocomplete
        v-show="!multisearch"
        v-model="year"
        class="select nav-desktop ma-0 pa-0 mr-4"
        :items="years"
        item-text="name"
        item-value="value"
        label="Filter by years"
        persistent-hint
        single-line
        hide-details
      />
      <v-checkbox
        v-model="multisearch"
        class="pr-5 nav-desktop"
        label="Multisearch"
        hide-details
        persistent-hint
        single-line
      />
      <input
        v-model="queryValue"
        type="text"
        class="inputField nav-desktop rounded pl-1"
        placeholder="find your film here"
      />
      <v-btn
        height="35px"
        class="nav-desktop"
        small
        @click="queryInput"
      >
        Search
      </v-btn>
      <v-app-bar-nav-icon
        class="burger"
        @click="switchMenuOpen(!menuOpen)"
      />
    </v-toolbar>
    <nav
      :class="{ 'dropdown-after': menuOpen }"
      class="dropdown justify-center header"
    >
      <div
        class="menu d-flex flex-column-reverse align-center justify-space-around"
      >
        <div class="ma-0 pa-0 d-flex flex-column align-center">
          <v-row class="ma-0 pa-0">
            <v-switch
              v-model="$vuetify.theme.dark"
              color="white"
              class="ma-0 pa-0 pl-3"
              hint="This toggles the global state of the theme"
              hide-details
              inset
            />
          </v-row>
          <span>Theme</span>
        </div>

        <v-autocomplete
          v-model="region"
          class="select ma-0 pa-0 mr-4"
          :items="isoCodes"
          item-text="name"
          item-value="iso"
          label="Filter by regions"
          persistent-hint
          single-line
          hide-details
        />
        <v-autocomplete
          v-show="!multisearch"
          v-model="year"
          class="select ma-0 pa-0 mr-4"
          :items="years"
          item-text="name"
          item-value="value"
          label="Filter by years"
          persistent-hint
          single-line
          hide-details
        />
        <v-checkbox
          v-model="multisearch"
          class="pr-5"
          label="Multisearch"
          hide-details
          persistent-hint
          single-line
        />
        <div>
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
        </div>
      </div>
    </nav>
    <v-img
      class="banner mx-auto mt-2"
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
      multisearch: false,
      isoCodes,
      years,
      region: '',
      year: ''
    };
  },
  props: {
    menuOpen: { type: Boolean, required: true },
    switchMenuOpen: { type: Function, required: true }
  },
  methods: {
    ...mapMutations('searchMovies', ['removePreviosResult']),
    queryInput() {
      const query = {
        page: 1,
        keywords: this.queryValue,
        multisearch: this.multisearch || false
      };
      if (this.region) {
        query.region = this.region;
      }
      if (this.year && !this.multisearch) {
        query.year = this.year;
      }

      if (this.queryValue.trim()) {
        this.$router.push({
          path: '/search',
          query
        });
      }
      this.switchMenuOpen(false);
      this.queryValue = '';
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
  },
  watch: {
    isMulti() {
      if (!this.multisearch) {
        this.multisearch = this.isMulti;
      }
    },
    isYear() {
      if (!this.year) {
        this.year = this.isYear;
      }
    },
    isRegion() {
      if (!this.region) {
        this.region = this.isRegion;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dropdown {
  max-width: 1170px;
  margin: 0 auto;
  display: none;
  background-color: #6bc5da;
}
.burger {
  display: none;
}
.select {
  width: 110px;
}
.dropdown {
  max-width: 1170px;
  margin: 0 auto;
  display: none;
  background-color: #6bc5da;
}
.burger {
  display: none;
}
.select {
  width: 110px;
}
@media (max-width: 1060px) {
  .nav-desktop {
    display: none !important;
  }
  .burger {
    display: block;
  }
  .select {
    flex: 0 1 auto;
    width: 300px;
  }
  .inputField {
    margin-top: 30px;
  }
  .v-btn.v-btn--has-bg {
    margin-top: -2px;
  }
  .dropdown-after {
    height: 100vh;
    display: flex;
  }
  .menu {
    height: 300px;
  }
  .banner {
    display: none;
  }
}
.v-btn.v-btn--has-bg {
  margin-left: -10px;
  color: #ffffff;
  background-color: #22748c;
  box-shadow: none;
  border: 1px solid #22748c;
}
.v-btn.v-btn--has-bg:hover {
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
@media (min-width: 960px) {
  .v-toolbar.v-sheet {
    max-width: 1170px;
  }
}
@media (max-width: 1060px) {
  .nav-desktop {
    display: none !important;
  }
  .burger {
    display: block;
  }
  .select {
    flex: 0 1 auto;
    width: 300px;
  }
  .inputField {
    margin-top: 30px;
  }
  .v-btn.v-btn--has-bg {
    margin-top: -2px;
  }
  .dropdown-after {
    height: 100vh;
    display: flex;
  }
  .menu {
    height: 300px;
  }
  .banner {
    display: none;
  }
}
</style>
