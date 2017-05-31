import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as types from './mutation-types'
import space from './modules/space'
import order from './modules/order'
import count from './modules/count'
import user from './modules/user'
import publicModule from './modules/public'

Vue.use(Vuex)
export default new Vuex.Store({
  getters,
  actions,
  modules: {
    space,
    order,
    user,
    count,
    publicModule
  }
})
