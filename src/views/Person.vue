<template>
  <v-container
    v-if="!isLoading"
    v-show="!menuOpen"
    class="mt-2 mb-6 pa-4 rounded"
  >
    <v-row>
      <v-col 
        cols="4"
        class="d-none d-sm-block"
      >
        <v-img
          v-if="personDetails.profilePath"
          max-width="350px"
          :src="`${apiImg}/${personDetails.profilePath}`"
        />
        <img
          v-else
          width="100%"
          height="280px"
          src="../assets/not-found.svg"
        />
      </v-col>
      <v-col 
        cols="12" 
        sm="8"
      >
        <h1 class="display-3 font-weight-medium">
          {{ personDetails.name }}
        </h1>
        <h2 class="mb-2 font-weight-light display-1">
          {{ personDetails.birthPlace }}
        </h2>

        <p
          v-if="
            personDetails.birthday != null && personDetails.deathday === null
          "
          class="font-weight-medium title"
        >
          {{ `Age: ${calculatingAge()}` }}
          <br />
          {{ `Birthday: ${formattingDate(personDetails.birthday)}` }}
        </p>
        <p
          v-if="personDetails.deathday != null"
          class="mb-2 font-weight-medium title"
        >
          {{ `Age: ${calculatingAge()}` }}
          <br />
          {{
            `${formattingDate(personDetails.birthday)} - ${formattingDate(
              personDetails.deathday
            )}`
          }}
        </p>
        <p
          v-if="
            personDetails.birthday === null && personDetails.deathday === null
          "
          class="mb-2 font-weight-medium title"
        >
          Sorry, we have no information about this person 😔
        </p>

        <p class="pr-10 mt-2 text-justify">
          {{ personDetails.biography }}
        </p>
      </v-col>
    </v-row>
    <h3
      v-if="filmography.length"
      class="font-weight-bold headline mx-auto mb-3 text-center"
    >
      Filmography
    </h3>
    <v-row class="mb-4 justify-center">
      <v-slide-group
        :key="personDetails.id"
        class="rounded mx-3"
      >
        <v-card
          v-for="item in filmography"
          :key="item.creditID"
          :item="item"
          max-width="230px"
          class="ma-4 rounded"
          @click="filmID(item.mediaType, item.id)"
        >
          <v-img
            v-if="item.posterPath"
            max-width="100%"
            max-height="280px"
            :src="`${apiImg}/${item.posterPath}`"
          />
          <img
            v-else
            width="100%"
            height="280px"
            src="../assets/not-found.svg"
          />
          <v-card-text class="font-weight-bold text-center text-truncate">
            {{ item.mediaType.toUpperCase() }}
            <br />
            {{ item.title || item.name }}
            <br />
            <span class="font-weight-light caption text-center">
              {{ item.character }}
            </span>
          </v-card-text>
        </v-card>
      </v-slide-group>
    </v-row>
  </v-container>
  <page-loader v-else />
</template>

<script>
import { apiImg } from '../config/apiConfig';
import PageLoader from '../components/PageLoader.vue';

export default {
  data() {
    return { apiImg };
  },
  props: { menuOpen: { type: Boolean, required: true } },
  computed: {
    personDetails() {
      return this.$store.getters['person/person'];
    },
    filmography() {
      return this.$store.getters['person/filmography'];
    },
    isLoading() {
      return this.$store.getters['person/isLoading'];
    }
  },
  methods: {
    filmID(mediaType, id) {
      if (mediaType === 'movie' || mediaType === undefined) {
        this.$router.push({ path: '/movie/' + id });
      } else if (mediaType === 'tv') {
        this.$router.push({ path: '/tv/' + id });
      }
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
        'October',
        'November',
        'December'
      ];
      const month = months[fomatting.getMonth()];
      return `${fomatting.getDate()} ${month} ${fomatting.getFullYear()}`;
    },
    calculatingAge() {
      if (this.personDetails.deathday === null) {
        const ageMs =
          Date.now() - new Date(this.personDetails.birthday).getTime();
        const ageDate = new Date(ageMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      } else {
        const ageMs =
          new Date(this.personDetails.deathday) -
          new Date(this.personDetails.birthday);
        const ageDate = new Date(ageMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('person/fetchPerson', this.$route.params.id);
    await this.$store.dispatch(
      'person/fetchFilmography',
      this.$route.params.id
    );
  },
  components: { PageLoader }
};
</script>

<style lang="scss" scoped>
@media (min-width: 960px) {
  .container {
    max-width: 1170px;
  }
}

@media (max-width: 600px) {
  .v-card {
    width: 180px;
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
p {
  color: #1a5769;
}
.v-item-group {
  background-color: #1a576956;
  max-width: 98%;
}
</style>
