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
    getListHistory: state => state.list,
  },
  mutations: { 
    REMOVE_ITEM (state, idDelete) {
      state.list = state.list.filter(item => {
        return item.id !== idDelete;
      });
    },
    EDIT_ITEM (state, id) {
      console.log(id)
      state.list = state.list.find(item => {
        item.id === id;
        Vue.set(state.list, id, item)
      });
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
    editItem (context, id) {
      context.commit('EDIT_ITEM', id)
    },
    addItem(context, { inputValue, textAreaValue }) {
      context.commit('ADD_ITEM', { inputValue, textAreaValue })
    }
  },
  modules: {
  }
})
