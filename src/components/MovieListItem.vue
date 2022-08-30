<template>
  <v-card
    width="242"
    class="movie-list-item mr-16 mb-7"
  >
    <v-img
      height="318"
      :src="`${'https://image.tmdb.org/t/p/w500' + item.posterPath}`"
    />
    <v-card-title class="text-subtitle-1 pa-0 ml-2 pt-5 font-weight-bold">
      {{
        item.title.length > 25
          ? item.title.slice(0, 25).trim() + '...'
          : item.title
      }}
    </v-card-title>

    <v-container class="d-flex pa-0 py-3 align-center justify-space-between">
      <div class="font-weight-bold text-subtitle-1 ml-2">
        {{ item.releaseDate.slice(0, 4) }}
      </div>
      <div class="d-flex align-center flex-row-reverse">
        <span
          class="float-end red white--text font-weight-bold rounded-xl py-0,5 px-2 mx-1"
          :class="colorFilmScore(item.voteAverage)"
        >
          {{
            String(item.voteAverage).length === 1
              ? item.voteAverage + '.0'
              : item.voteAverage
          }}
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
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'MovieListItem',
  components: {},
  props: ['item'],
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
  },
  computed: {}
};
</script>

<style lang="scss">
@media (min-width: 960px) {
  .container {
    max-width: 1185px;
  }
  .movie-list-item:nth-child(4n) {
    margin-right: 0 !important;
  }
}
</style>
