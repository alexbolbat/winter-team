<template>
  <div>
    <v-card
      width="242"
      class="movie-list-item mb-7"
      :loading="isLoading"
      @click="onClickItem(item.mediaType)"
    >
      <v-img
        v-if="currentItem.img"
        height="318"
        :src="apiImg + currentItem.img"
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
          {{ currentItem.title }}
        </h5>

        <v-row class="genres ma-0 text-subtitle-1">
          {{ currentItem.description }}
        </v-row>

        <v-row class="justify-space-between ma-0 mt-3">
          <div class="font-weight-bold text-subtitle-1">
            {{ currentItem.footerLeft }}
          </div>

          <div class="d-flex align-center flex-row-reverse">
            <span
              class="float-end red white--text font-weight-bold rounded-xl py-0,5 px-2 mx-1"
              :class="colorFilmScore(currentItem.score)"
            >
              {{ currentItem.score }}
            </span>
            <v-rating
              v-if="item.mediaType !== 'person'"
              :value="currentItem.score / 2"
              :color="colorFilmScore(currentItem.score)"
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
  computed: {
    ...mapGetters(['genres']),
    currentItem() {
      const item = {};
      if (this.item.mediaType === 'person') {
        item.img = this.item.profilePath;
        item.title = this.item.name;
        item.description = this.item.mediaType;
        item.footerLeft = 'Popularity:';
        item.score = this.item.popularity.toFixed(1);
      } else if (this.item.mediaType === 'tv') {
        item.img = this.item.posterPath;
        item.title = this.item.name;
        item.description = this.item.mediaType;
        item.footerLeft =
          new Date(this.item.firstAirDate).getFullYear() || 'No year';
        item.score = this.item.voteAverage.toFixed(1);
      } else {
        item.img = this.item.posterPath;
        item.title = this.item.title;
        item.description =
          this.genres(this.item.genreIds).join(', ') || 'No genres';
        item.footerLeft =
          new Date(this.item.releaseDate).getFullYear() || 'No year';
        item.score = this.item.voteAverage.toFixed(1);
      }

      return item;
    }
  },
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
    filmID(id) {
      this.$router.push({ path: '/movie/' + id });
    },
    onClickItem(mediaType) {
      if (mediaType === 'person') {
        this.$router.push({ path: '/person/' + this.item.id });
      } else if (mediaType === 'movie' || mediaType === undefined) {
        this.$router.push({ path: '/movie/' + this.item.id });
      } else if (mediaType === 'tv') {
        this.$router.push({ path: '/tv/' + this.item.id });
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
