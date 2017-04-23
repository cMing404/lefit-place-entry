import * as types from '../mutation-types'
const state = {
  listAll: [],
  listFinished: [],
  listUnfinished: []

}
const mutations = {
  // 保存订单列表
  [types.PUSH_ORDER_LIST_ALL] (state, {list, page}) {
    if (page === 0) {
      state.listAll = list
    } else {
      state.listAll = state.listAll.concat(list)
    }
  },
  [types.PUSH_ORDER_LIST_FINISHED] (state, {list, page}) {
    if (page === 0) {
      state.listFinished = list
    } else {
      state.listFinished = state.listFinished.concat(list)
    }
  },
  [types.PUSH_ORDER_LIST_UNFINISHED] (state, {list, page}) {
    if (page === 0) {
      state.listUnfinished = list
    } else {
      state.listUnfinished = state.listUnfinished.concat(list)
    }
  },
  [types.PUSH_COUNT_LIST] (state, {list, page}) {
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
