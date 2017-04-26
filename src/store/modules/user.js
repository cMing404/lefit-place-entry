import * as types from '../mutation-types'
const state = {
  token: '',
  myCoreProfile: {}
}
const mutations = {
  [types.PUSH_USER_TOKEN] (state, str) {
    state.token = str
  },
  [types.PUSH_MY_CORE_PROFILE] (state, data) {
    state.myCoreProfile = data
  }
}
export default {
  state,
  mutations
}