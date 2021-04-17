  
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
Vue.use(Vuex)
import getters from './getters'
const store = new Vuex.Store({
  modules: {
    app,
  },
  getters
})

export default store