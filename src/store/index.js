import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
// import * as actions from './actions'
import space from './modules/space'

Vue.use(Vuex)
export default new Vuex.Store({
  getters,
  modules: {
    space
  }
})