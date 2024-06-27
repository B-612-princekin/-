import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cutShow:true,
    isDarkMode: false,
  },
  getters: {
  },
  mutations: {
    alterCutShow:function(state){
      state.cutShow = !state.cutShow;
    },
    toggleDarkMode: function (state, bool) {
      state.isDarkMode = bool;
    },
  },
  actions: {
  },
  modules: {
  }
})
