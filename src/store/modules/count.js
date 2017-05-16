import * as types from '../mutation-types'
const state = {
  data: {}

}
const mutations = {
  [types.PUSH_COUNT_LIST] (state, data) {
    state.data = data
  }
}
export default {
  state,
  mutations
}
