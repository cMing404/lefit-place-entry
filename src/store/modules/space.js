import * as types from '../mutation-types'
const state = {
  mapCache: {}
}
const mutations = {
  // 缓存地图编辑的信息
  cacheMapInfo (state, data) {
    state.mapCache = data
  },
  [types.PUSH_MAP_CACHE] (state, data) {
    // 这里只是一个例子
    state.mapCache = data
  }
}
export default {
  state,
  mutations
}