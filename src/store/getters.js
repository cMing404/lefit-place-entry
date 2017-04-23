export const getSpace = state => state.space // 获取场地数据
export const getSpaceDetail = state => state.space.spaceDetail
export const getSpaceType = state => state.space.typeList
export const getSpaceBase = state => state.space.spaceDetail.storeAreaBaseInfoResp

// 订单模块
export const getOrder = state => state.order // 获取订单数据
export const getOrderALL = state => state.order.listAll // 获取订单数据
export const getOrderFinished = state => state.order.listFinished // 获取订单数据
export const getOrderUnFinished = state => state.order.listUnfinished // 获取订单数据

// 结算模块
export const getCountData = state => state.count.data
