import * as types from './mutation-types'
// 订单模块
export const pushOrderListAll = ({ commit }, data) => {
  commit(types.PUSH_ORDER_LIST_ALL, data)
}
export const pushOrderListFinished = ({ commit }, data) => {
  commit(types.PUSH_ORDER_LIST_FINISHED, data)
}
export const pushOrderListUnfinished = ({ commit }, data) => {
  commit(types.PUSH_ORDER_LIST_UNFINISHED, data)
}
export const pushStoreAreaList = ({ commit }, data) => {
  commit(types.PUSH_STORE_AREA_LIST, data)
}

// 场地模块
export const pushSpaceList = ({commit}, data) => {
  commit(types.PUSH_SPACE_LIST, data)
}
export const pushTypeList = ({commit, state}) => {
  return new Promise((resolve, reject) => {
    if (!state.space.typeList.length) {
      this.$ajax(this.$API.getAreaTypeList, null, (res) => {
        commit(types.PUSH_TYPE_LIST, res)
        resolve()
      }, err => {
        reject(err)
      }, fail => {
        reject(fail)
      })
    } else {
      resolve()
    }
  })
}
export const pushSpaceDetail = ({commit, state}, {id, reload}) => {
  return new Promise((resolve, reject) => {
    if (reload || !Object.keys(state.space.spaceDetail).length) {
      this.$ajax(this.$API.getStoreAreaInfo, {id: id}, res => {
        commit(types.PUSH_SPACE_DETAIL, res)
        resolve(res)
      }, err => {
        reject(err)
      }, fail => {
        reject(fail)
      })
    } else {
      resolve(state.space.spaceDetail)
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

// 结算模块
export const pushCountList = ({commit}, data) => {
  commit(types.PUSH_COUNT_LIST, data)
}

// 个人中心模块
export const pushUserToken = ({commit}, str) => {
  commit(types.PUSH_USER_TOKEN, str)
}
export const pushMyCoreProfile = ({ commit }, data) => {
  commit(types.PUSH_MY_CORE_PROFILE, data)
}
// 全局模块
export const loadingTrue = ({commit}) => {
  commit(types.LOADINGTRUE, true)
}
export const loadingFalse = ({ commit }) => {
  commit(types.LOADINGFALSE, false)
}