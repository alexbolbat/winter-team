<template>
  <v-card
    max-width="230px"
    class="ma-4 rounded"
    @click="personID(item.id)"
  >
    <v-img
      v-if="item.profilePath"
      max-width="auto"
      max-height="280px"
      :src="`${apiImg}/${item.profilePath}`"
    />
    <img
      v-else
      width="100%"
      height="280px"
      src="../assets/not-found.svg"
      alt="not-found"
    />
    <v-card-text class="font-weight-bold text-center text-truncate">
      {{ item.name }}
      <br />
      <span class="font-weight-light caption text-center">
        {{ item.character }}
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
import { apiImg } from '../config/apiConfig';

export default {
  data() {
    return {
      apiImg
    };
  },
  props: { item: { type: Object, required: true } },
  methods: {
    personID(id) {
      this.$router.push({ path: '/person/' + id });
    }
  }
};
</script>

<style lang="scss" scoped>
@media (max-width: 600px) {
  .v-card {
    width: 180px;
  }
}
</style>
