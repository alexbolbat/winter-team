<template>
  <div>
    <v-card
      width="242"
      class="movie-list-item mb-7"
      :loading="isLoading"
      @click="onClickItem(item.mediaType)"
    >
      <v-img
        v-if="item.profilePath || item.posterPath"
        height="318"
        :src="apiImg + (item.profilePath || item.posterPath)"
        @load="loaded"
      />
      <img
        v-else
        height="318"
        width="242"
        src="../assets/not-found.svg"
        alt="not found"
      />
      <v-card-text>
        <h5 class="title text-subtitle-1 pa-0 font-weight-bold">
          {{
            item.mediaType === 'person' || item.mediaType === 'tv'
              ? item.name
              : item.title
          }}
        </h5>

        <v-row class="genres ma-0 text-subtitle-1">
          {{
            item.mediaType === 'person' || item.mediaType === 'tv'
              ? item.mediaType
              : genres(item.genreIds).join(', ') || 'No genres'
          }}
        </v-row>

        <v-row class="justify-space-between ma-0 mt-3">
          <div
            v-if="item.mediaType === 'person'"
            class="font-weight-bold text-subtitle-1"
          >
            {{ 'Popularity:' }}
          </div>
          <div
            v-if="item.mediaType === 'tv'"
            class="font-weight-bold text-subtitle-1"
          >
            {{ new Date(item.firstAirDate).getFullYear() || 'No year' }}
          </div>
          <div
            v-if="item.mediaType === 'movie' || item.mediaType === undefined"
            class="font-weight-bold text-subtitle-1"
          >
            {{ new Date(item.releaseDate).getFullYear() || 'No year' }}
          </div>
          <div class="d-flex align-center flex-row-reverse">
            <span
              class="float-end red white--text font-weight-bold rounded-xl py-0,5 px-2 mx-1"
              :class="
                colorFilmScore(
                  item.mediaType === 'person'
                    ? item.popularity
                    : item.voteAverage
                )
              "
            >
              {{
                item.mediaType === 'person'
                  ? item.popularity.toFixed(1)
                  : item.voteAverage.toFixed(1)
              }}
            </span>
            <v-rating
              v-if="item.mediaType !== 'person'"
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
  </div>
</template>

<script>
import { apiImg } from '../config/apiConfig';
import { mapGetters } from 'vuex';

export default {
  name: 'MovieListItem',
  data() {
    return {
      isLoading: this.item.profilePath || this.item.posterPath,
      apiImg
    };
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
    },
    onClickItem(mediaType) {
      if (mediaType === 'person') {
        this.$router.push({ path: '/person/' + this.item.id });
        this.$store.dispatch('personDetails/fetchPerson', this.item.id);
      } else if (mediaType === 'movie' || mediaType === undefined) {
        this.$router.push({ path: '/movie/' + this.item.id });
        this.$store.dispatch('movieDetails/fetchMovie', this.item.id);
      }
    },
    loaded() {
      this.isLoading = false;
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
  text-transform: capitalize;
}
</style>
