import * as types from '../mutation-types'
const state = {
  token: ''
}
const mutations = {
  [types.PUSH_USER_TOKEN] (state, str) {
    state.token = str
  }
}
export default {
  state,
  mutations
}
