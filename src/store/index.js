import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import space from './modules/space'
import order from './modules/order'
import count from './modules/count'

Vue.use(Vuex)
export default new Vuex.Store({
  getters,
  actions,
  modules: {
    space,
    order,
    count
  }
})
