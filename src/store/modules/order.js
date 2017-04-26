import * as types from '../mutation-types'
const state = {
  listAll: {
    list: [],
    page: 0
  },
  listFinished: {
    list: [],
    page: 0
  },
  listUnfinished: {
    list: [],
    page: 0
  },
  storeAreaList: []
}
const mutations = {
  // 保存订单列表
  [types.PUSH_ORDER_LIST_ALL] (state, {list, page}) {
    if (page === 0) {
      state.listAll.list = list
    } else {
      state.listAll.list = state.listAll.list.concat(list)
    }
    state.listAll.page = page
  },
  [types.PUSH_ORDER_LIST_FINISHED] (state, {list, page}) {
    if (page === 0) {
      state.listFinished.list = list
    } else {
      state.listFinished.list = state.listFinished.list.concat(list)
    }
    state.listFinished.page = page
  },
  [types.PUSH_ORDER_LIST_UNFINISHED] (state, {list, page}) {
    if (page === 0) {
      state.listUnfinished.list = list
    } else {
      state.listUnfinished.list = state.listUnfinished.list.concat(list)
    }
    state.listUnfinished.page = page
  },
  [types.PUSH_STORE_AREA_LIST] (state, {list}) {
    state.storeAreaList = list
  }
}
export default {
  state,
  mutations
}
