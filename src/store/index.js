import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [
      { value: 'Buy coffee', selected: false, id: Math.floor(Math.random() * 100), description: 'arabica' },
      { value: 'Pet the cat', selected: false, id: Math.floor(Math.random() * 100), description: 'also give the cat treats' },
      { value: 'Visit doctor', selected: false, id: Math.floor(Math.random() * 100), description: 'at 12 o`clock' },
      { value: 'Pay internet', selected: false, id: Math.floor(Math.random() * 100), description: 'withdraw money' }		
    ]
  },
  getters: {
    item: state => id => state.find(item => item.id === id),
    listListHistory: state => state.list,
  },
  mutations: { 
    REMOVE_ITEM (state, itemId) {
      state.list = state.list.filter(item => item.id !== itemId);
    },
    CONFIRM_ITEM (state, data) {
      const item = state.list.find(item => item.id === data.id);
      Vue.set(item, 'value', data.value);
      Vue.set(item, 'description', data.description);
      Vue.set(item, 'id', data.id);
    },
    ADD_ITEM (state, { inputValue, textAreaValue }) {
      state.list.push({ value: inputValue, selected: false, id: Math.floor(Math.random() * 100), description: textAreaValue });
    }
  },
  actions: {
    removeItem (context, id) {
      context.commit('REMOVE_ITEM', id);
    },
    confirmItem (context, data) {
      context.commit('CONFIRM_ITEM', data);
    },
    addItem(context, { inputValue, textAreaValue }) {
      context.commit('ADD_ITEM', { inputValue, textAreaValue });
    },
  },
  modules: {
  }
});
