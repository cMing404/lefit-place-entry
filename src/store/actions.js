import * as types from './mutation-types'
import ajax from '../js/tools/ajax'
import API from '../js/tools/api'
// 订单模块
export const pushOrderList = ({ commit }, data) => {
  commit(types.PUSH_ORDER_LIST, data)
}

// 场地模块
export const pushSpaceList = ({commit}, data) => {
  commit(types.PUSH_SPACE_LIST, data)
}
export const pushTypeList = ({commit, state}) => {
  // if (!state.space.typeList.length) {
  //   ajax(API.getAreaTypeList, null, (res) => {
  //     commit(types.PUSH_TYPE_LIST, res.getAreaTypeList.data)
  //   })
  // }
  return new Promise((resolve, reject) => {
    if (!state.space.typeList.length) {
      ajax(API.getAreaTypeList, null, (res) => {
        commit(types.PUSH_TYPE_LIST, res.getAreaTypeList.data)
        resolve()
      })
    } else {
      resolve()
    }
  })
}
export const pushSpaceDetail = ({commit, state}, id) => {
  return new Promise((resolve, reject) => {
    if (!Object.keys(state.space.spaceDetail).length) {
      ajax(API.getStoreAreaInfo, {id: id}, res => {
        commit(types.PUSH_SPACE_DETAIL, res.getStoreAreaInfo.data)
        resolve(res.getStoreAreaInfo.data)
      })
    } else {
      resolve(state.spaceDetail)
    }
  })
}
export const cacheMapInfo = ({commit}, data) => {
  commit(types.PUSH_MAP_CACHE, data)
}
export const pushSpaceBase = ({commit}, data) => {
  commit(types.PUSH_SPACE_BASE, data)
}
export const pushSpaceClass = ({commit}, data) => {
  commit(types.PUSH_SPACE_CLASS, data)
}
