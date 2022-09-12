import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        header: '#6bc5da',
        review: '#1976D2'
      },
      dark: {
        header: '#1a5769',
        review: '#ffffff'
      }
    }
  }
});
