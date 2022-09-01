<template>
  <v-container
    class="mt-2 pa-4 rounded"
  >
    <v-row>
      <v-col  cols="4">
        <v-img
          max-width="350px"
          :src="`${apiImg+ personDetails.profilePath}`"
        />
      </v-col>
      <v-col cols="8">
        <h1 class="display-3 font-weight-medium">
          {{personDetails.name}}
        </h1>
        <h2 
          class="mb-2 font-weight-light display-1"
        >
          {{personDetails.birthPlace}}
        </h2>
        <span
          v-show="personDetails.birthday != null"
          class="font-weight-medium title"
        >
          {{`Birthday: ${formattingDate(personDetails.birthday)}`}}
        </span>
        <br />
        <span
          v-show="personDetails.deathday != null"
          class="mb-2 font-weight-medium title"
        >
          {{`Deathday: ${formattingDate(personDetails.deathday)}`}}
        </span>
        <p class="pr-10 mt-2 text-justify">
          {{personDetails.biography}}
        </p>
      </v-col>
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
      console.log(this.$store.getters['personDetails/person']);
      return this.$store.getters['personDetails/person'];
    },
  },
  methods: {
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
  }
};
</script>

<style scoped>
@media (min-width: 1185px) {
  .container {
    max-width: 1185px;
  }
}
  
  .container{
    background-color: #6bc6dad7;
  }
  
  h1, h2{
    color: #412631;
  }
  
  
  h3, p, span{
    color: #1a5769;
  }
  </style>