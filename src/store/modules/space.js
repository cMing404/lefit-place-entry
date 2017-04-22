import * as types from '../mutation-types'
const state = {
  typeList: [], // 场地类型列表
  spaceList: [], // 列表
  spaceDetail: {},
  mapCache: {}, // 地图缓存信息
  spaceBase: {}, // 临时保存场地详情页的基本信息
  spaceClass: [] // 临时保存场地详情页的授课信息
}
const mutations = {
  [types.PUSH_SPACE_LIST] (state, {list}) {
    state.spaceList = list
  },
  [types.PUSH_TYPE_LIST] (state, {list}) {
    state.typeList = list
  },
  [types.PUSH_SPACE_DETAIL] (state, data) {
    state.spaceDetail = data
    // let count = 0
    // state.spaceDetail.forEach((v) => {
    //   count++
    //   if (v.id === id) {
    //     v = {id, data}
    //     return
    //   }
    // })
    // if (count === 0 || count === state.spaceDetail.length - 1) {
    //   console.log(data)
    //   state.spaceDetail.push({id, data})
    // }
  },
  // 缓存地图编辑的信息
  [types.PUSH_MAP_CACHE] (state, data) {
    state.mapCache = data
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
