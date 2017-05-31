import * as types from '../mutation-types'
const state = {
  isLoading: false
}
const mutations = {
  [types.LOADINGTRUE] (state, bool) {
    state.isLoading = bool
  },
  [types.LOADINGFALSE] (state, bool) {
    state.isLoading = bool
  }
}
export default {
  state,
  mutations
}