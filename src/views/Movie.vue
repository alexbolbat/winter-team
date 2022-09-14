<template>
  <v-container
    v-if="!isLoading"
    v-show="!menuOpen"
    class="mt-2 mb-6 pa-4 rounded"
  >
    <v-row>
      <v-col 
        cols="4"
        class="posterTab"  
      >
        <v-img
          v-if="movieDetails.posterPath"
          max-width="350px"
          :src="`${apiImg}/${movieDetails.posterPath}`"
        />
        <img
          v-else
          width="350px"
          src="../assets/not-found.svg"
        />
      </v-col>
      <v-col cols="8">
        <h1 class="display-3 font-weight-medium">
          {{ movieDetails.title }}
        </h1>
        <h2 class="mb-2 font-weight-light display-1">
          {{ movieDetails.tagline }}
        </h2>
        <h3 class="font-weight-regular mb-2">
          Year: {{ new Date(movieDetails.releaseDate).getFullYear() }}
          <br />
          Genres:
          {{
            movieDetails.genreIds
              ? movieDetails.genreIds
                .map(item => item.name)
                .join(', ')
                .toLowerCase()
              : 'No genres'
          }}
        </h3>
        <v-rating
          :value="movieDetails.voteAverage / 2"
          readonly
          half-increments
          color="#1a5769"
          background-color="#1a5769"
          size="25"
        />
        <span class="font-weight-bold title">
          {{ movieDetails.voteAverage && movieDetails.voteAverage.toFixed(1) }}
        </span>
        <p class="pr-10 mt-2 text-justify">
          {{ movieDetails.overview }}
        </p>
      </v-col>
    </v-row>
    <h3
      class="font-weight-bold headline mb-4 text-center"
    >
      Top Billed Cast
    </h3>
    <v-row class="mb-4 justify-center">
      <v-slide-group
        :key="movieDetails.id"
        class="rounded mx-3"
      >
        <cast-component
          v-for="item in castDetails"
          :key="item.creditID"
          :item="item"
        />
      </v-slide-group>
    </v-row>
    <h3
      class="font-weight-bold headline mx-auto mb-4 text-center"
    >
      Users often search with {{movieDetails.title}}
    </h3>
    <v-row
      class="justify-center"
    >
      <v-slide-group
        :key="similar.id"
        class="rounded mx-3 mb-4"
      >
        <v-card
          v-for="item in similar"
          :key="item.id"
          :item="item"
          max-width="230px"
          class="ma-4 rounded"
          @click="filmID(item.id)"
        >
          <v-img
            v-if="item.posterPath"
            max-width="auto"
            max-height="280px"
            :src="`${apiImg}/${item.posterPath}`"
          />
          <img
            v-else
            height="280px"
            src="../assets/not-found.svg"
          />
          <v-card-text class="font-weight-bold text-center text-truncate">
            {{ item.title }}
            <br />
          </v-card-text>
        </v-card>
      </v-slide-group>
    </v-row>
    <v-row>
      <h3
        class="font-weight-bold headline mx-auto mb-3"
      >
        Users reviews
      </h3>
      <v-card
        v-for="item in reviews"
        :key="item.id"
        :item="item"
        class="mb-3 mx-2"
        width="100%"
      >
        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-content>
              <v-list-item-title>
                {{ item.author }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-actions>
        <v-card-text class="text-caption font-weight-medium">
          <p
            v-if="!showAll[item.id]"
            :key="item.id"
            class="review--text"
          >
            {{ item.content.slice(0, 600) }}
            <span
              v-if="item.content.length > 600"
              class="font-weight-bold ml-2 text-uppercase showMore"
              @click="showMore(item.id)"
            >
              ...show full review
            </span>
          </p>
          <p v-if="showAll[item.id]">
            {{ item.content }}
          </p>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
  <page-loader v-else />
</template>

<script>
import { apiImg } from '../config/apiConfig';
import CastComponent from '../components/СastComponent.vue';
import PageLoader from '../components/PageLoader.vue';

export default {
  data() {
    return {
      apiImg,
      showAll: {}
    };
  },
  components: { CastComponent, PageLoader },
  props: { menuOpen: { type: Boolean, required: true } },
  computed: {
    movieDetails() {
      return this.$store.getters['movie/movie'];
    },
    castDetails() {
      return this.$store.getters['movie/cast'];
    },
    reviews() {
      return this.$store.getters['movie/reviews'];
    },
    similar() {
      return this.$store.getters['movie/similar'];
    },
    isLoading() {
      return this.$store.getters['movie/isLoading'];
    }
  },
  methods: {
    personID(id) {
      this.$router.push({ path: '/person/' + id });
    },
    filmID(id) {
      this.$router.push({ path: '/movie/' + id });
    },
    showMore(id) {
      this.$set(this.showAll, id, true);
    }
  },
  async mounted() {
    await this.$store.dispatch('movie/fetchMovie', this.$route.params.id);
    await this.$store.dispatch('movie/fetchCast', this.$route.params.id);
    await this.$store.dispatch('movie/fetchRewiews', this.$route.params.id);
    await this.$store.dispatch('movie/fetchSimilar', this.$route.params.id);
  },
  beforeRouteUpdate(to, from) {
    if (to.path !== from.path) {
      window.location = to.path;
    }
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 960px) {
  .container {
    max-width: 1170px;
  }
}
.container {
  background-color: #6bc6dad7;
}

.v-rating {
  max-width: 50%;
  display: inline;
}

h1,
h2 {
  color: #412631;
}

h3,
p,
span {
  color: #1a5769;
}

.v-item-group {
  background-color: #1a576956;
  max-width: 98%;
}

.showMore {
  color: #6bc6da;
  cursor: pointer;
}
</style>
