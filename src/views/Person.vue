<template>
  <v-container class="mt-2 mb-6 pa-4 rounded">
    <v-row>
      <v-col cols="4">
        <v-img
          v-if="personDetails.profilePath"
          max-width="350px"
          :src="`${apiImg}/${personDetails.profilePath}`"
        />
        <img
          v-else
          width="350px"
          src="../assets/not-found.svg"
        />
      </v-col>
      <v-col cols="8">
        <h1 class="display-3 font-weight-medium">
          {{ personDetails.name }}
        </h1>
        <h2 class="mb-2 font-weight-light display-1">
          {{ personDetails.birthPlace }}
        </h2>
        <span
          v-show="personDetails.birthday != null"
          class="font-weight-medium title"
        >
          {{ `Birthday: ${formattingDate(personDetails.birthday)}` }}
        </span>
        <br />
        <span
          v-show="personDetails.deathday != null"
          class="mb-2 font-weight-medium title"
        >
          {{ `Deathday: ${formattingDate(personDetails.deathday)}` }}
        </span>
        <p class="pr-10 mt-2 text-justify">
          {{ personDetails.biography }}
        </p>
      </v-col>
    </v-row>
    <v-row class="mb-4">
      <v-slide-group
        :key="personDetails.id"
        class="rounded mx-2"
      >
        <v-card
          v-for="item in filmography"
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
            <span class="font-weight-light caption text-center">
              {{ item.character }}
            </span>
          </v-card-text>
        </v-card>
      </v-slide-group>
    </v-row>
  </v-container>
</template>

<script>
import { apiImg } from '../config/apiConfig';

export default {
  data() {
    return { apiImg };
  },
  computed: {
    personDetails() {
      return this.$store.getters['person/person'];
    },
    filmography() {
      return this.$store.getters['person/filmography'];
    }
  },
  methods: {
    filmID(id) {
      this.$store.commit('movie/RESET_STATE');
      this.$store.commit('person/RESET_STATE');
      this.$router.push({ path: '/movie/' + id });
    },
    formattingDate(date) {
      const fomatting = new Date(date);
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'November',
        'December'
      ];
      const month = months[fomatting.getMonth()];
      return `${fomatting.getDate()} ${month} ${fomatting.getFullYear()}`;
    }
  },
  mounted() {
    this.$store.dispatch('person/fetchPerson', this.$route.params.id);
    this.$store.dispatch('person/fetchFilmography', this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 1185px) {
  .container {
    max-width: 1170px;
  }
}

.container {
  background-color: #6bc6dad7;
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
  background-color: #1a576980;
  max-width: 1145px;
}
</style>