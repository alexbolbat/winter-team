<template>
  <v-card
    max-width="230px"
    class="ma-4 rounded"
    @click="personID(item.id)"
  >
    <v-img
      max-width="auto"
      max-height="280px"
      :lazy-src="`${apiImg}/${item.profilePath}`"
      :src="`${apiImg}/${item.profilePath}`"
    />
    <div
      v-show="item.profilePath === null"
    >
      <v-img
        class="mb-5"
        max-width="auto"
        max-height="280px"
        lazy-src="../assets/not-found.svg"
        src="../assets/not-found.svg"
      />         
    </div>
    <v-card-text
      class="font-weight-bold text-center text-truncate"
    >
      {{item.name}}
      <br />
      <span
        class="font-weight-light caption text-center"
      >
        {{item.character}}
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
import { apiImg } from '../config/apiConfig';

export default {
  data() {
    return {
      apiImg,
    };
  },
  props: { item: { type: Object, required: true } },
  methods: {
    personID(id) {
      this.$router.push({ path: '/person/' + id });
      this.$store.dispatch('personDetails/fetchPerson', id);
      this.$store.dispatch('personFilmography/fetchFilmography', id);
    },
  }
};

</script>