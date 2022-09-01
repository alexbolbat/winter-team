<template>
  <v-card
    width="242"
    class="movie-list-item mb-7"
  >
    <v-img
      height="318"
      :src="apiImg + item.posterPath"
    />

    <v-card-text>
      <h5 class="title text-subtitle-1 pa-0 font-weight-bold">
        {{ item.title }}
      </h5>

      <v-row class="genres ma-0 text-subtitle-1">
        {{ genres(item.genreIds) }}
      </v-row>
      <v-row class="justify-space-between ma-0 mt-3">
        <div class="font-weight-bold text-subtitle-1">
          {{ new Date(item.releaseDate).getFullYear() }}
        </div>

        <div class="d-flex align-center flex-row-reverse">
          <span
            class="float-end red white--text font-weight-bold rounded-xl py-0,5 px-2 mx-1"
            :class="colorFilmScore(item.voteAverage)"
          >
            {{ item.voteAverage.toFixed(1) }}
          </span>
          <v-rating
            :value="item.voteAverage / 2"
            :color="colorFilmScore(item.voteAverage)"
            dense
            half-increments
            readonly
            size="14"
            class="d-inline"
          />
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { apiImg } from '../config/apiConfig';
import { mapGetters } from 'vuex';

export default {
  name: 'MovieListItem',
  data() {
    return { apiImg };
  },
  props: { item: { type: Object, required: true } },
  computed: { ...mapGetters(['genres']) },
  methods: {
    colorFilmScore(score) {
      if (!score) {
        return null;
      } else if (score <= 4) {
        return 'red';
      } else if (score > 4 && score < 8) {
        return 'orange';
      } else if (score >= 8) {
        return 'green';
      }
      return 'ember';
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  white-space: nowrap;
  width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.genres {
  height: 50px;
  overflow: hidden;
}
</style>
