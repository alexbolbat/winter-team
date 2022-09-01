<template>
  <v-container
    class="mt-2 pa-4 rounded"
  >
    <v-row>
      <v-col  cols="4">
        <v-img
          max-width="350px"
          :src="`${apiImg+ choosedPerson.person.choosed.profilePath}`"
        />
      </v-col>
      <v-col cols="8">
        <h1 class="display-3 font-weight-medium">
          {{choosedPerson.person.choosed.name}}
        </h1>
        <h2 
          class="mb-2 font-weight-light display-1"
        >
          {{choosedPerson.person.choosed.birthPlace}}
        </h2>
        <span
          v-show="choosedPerson.person.choosed.birthday != null"
          class="font-weight-medium title"
        >
          {{`Birthday: ${formattingDate(choosedPerson.person.choosed.birthday)}`}}
        </span>
        <br />
        <span
          v-show="choosedPerson.person.choosed.deathday != null"
          class="mb-2 font-weight-medium title"
        >
          {{`Deathday: ${formattingDate(choosedPerson.person.choosed.deathday)}`}}
        </span>
        <p class="pr-10 mt-2 text-justify">
          {{choosedPerson.person.choosed.biography}}
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
    choosedPerson() {
      return this.$store.getters['choosedPerson/choosedPerson'];
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