import * as types from '../mutation-types'
const state = {
  typeList: [], // 场地类型列表
  spaceList: [], // 列表
  spaceDetail: {},
  spaceBase: {}, // 临时保存场地详情页的基本信息
  spaceClass: [] // 临时保存场地详情页的授课信息
}
const mutations = {
  [types.PUSH_SPACE_LIST] (state, {list, page}) {
    if (page === 1) {
      state.spaceList = list
    } else {
      state.spaceList = state.spaceList.concat(list)
    }
  },
  [types.PUSH_TYPE_LIST] (state, {list}) {
    state.typeList = list
  },
  [types.PUSH_SPACE_DETAIL] (state, data) {
    state.spaceDetail = data
  },
  [types.PUSH_SPACE_BASE] (state, data) {
    state.spaceBase = data
  },
  [types.PUSH_SPACE_CLASS] (state, data) {
    state.spaceClass = data
  }
}
export default {
  state,
  mutations
}
