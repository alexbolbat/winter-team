import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [
      { value: 'abc', selected: false, id: 1, description: 'hello world' },
      { value: 'zxc', selected: false, id: Math.floor(Math.random()*100), description: 'hello world1' },
      { value: 'asd', selected: false, id: Math.floor(Math.random()*100), description: 'hello world2' },
      { value: '123', selected: false, id: Math.floor(Math.random()*100), description: 'hello world3' }		
    ]
  },
  getters: {
    item: state => id => state.find(item => item.id === id),
    listListHistory: state => state.list,
  },
  mutations: { 
    REMOVE_ITEM (state, itemId) {
      state.list = state.list.filter(item => item.id !== itemId)
    },
    EDIT_ITEM (state, { inputValue, id, textAreaValue }) {
      const item = state.find(item => item.id === id)
      Vue.set(item, 'value', inputValue)
      Vue.set(item, 'description', textAreaValue)
    },
    ADD_ITEM (state, { inputValue, textAreaValue }) {
      console.log('mutations', inputValue, textAreaValue)
      state.list.push({ value: inputValue, selected: false, id: Math.floor(Math.random()*100), description: textAreaValue })
    }
  },
  actions: {
    removeItem (context, id) {
      context.commit('REMOVE_ITEM', id)
    },
    editItem (context, { inputValue, id, textAreaValue }) {
      context.commit('EDIT_ITEM', { inputValue, id, textAreaValue })
    },
    addItem(context, { inputValue, textAreaValue }) {
      context.commit('ADD_ITEM', { inputValue, textAreaValue })
    }
  },
  modules: {
  }
})
