import * as types from '../mutation-types'
const state = {
  list: []
}
const mutations = {
  // 保存订单列表
  [types.PUSH_ORDER_LIST] (state, {list, page}) {
    if (page === 0) {
      state.list = list
    } else {
      state.list = state.list.concat(list)
    }
  }
}
export default {
  state,
  mutations
}
