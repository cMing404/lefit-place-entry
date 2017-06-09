let baseUrl = '/coach/v1/area_app/'
export default {
  // 获取场地类型列表
  getAreaTypeList: baseUrl + 'getAreaTypeList',
  // 添加场地（第一步）
  addStoreArea: baseUrl + 'addStoreArea',
  // 更新场地（第二步）
  updateStoreArea: baseUrl + 'updateStoreArea',
  // 删除场地
  deleteStoreArea: baseUrl + 'deleteStoreArea',
  // 更新课程状态
  updateStoreClassSetStatus: baseUrl + 'updateStoreClassSetStatus',
  // 查询场地详情
  // getStoreAreaInfo: baseUrl + 'getStoreAreaInfo',
  getStoreAreaInfo: '/mock/area_app/' + 'getStoreAreaInfo',
  // 修改场地空间信息
  updateStoreSpace: baseUrl + 'updateStoreSpace',
  // 删除场地空间信息
  deleteStoreSpace: baseUrl + 'deleteStoreSpace',
  // 订单列表
  getAreaOrderList: baseUrl + 'getAreaOrderList',
  // 场地列表
  getStoreAreaList: baseUrl + 'getStoreAreaList',
  // 场地筛选条件
  getConditionStoreAreaList: baseUrl + 'getConditionStoreAreaList',
  // 个人中心
  getMyCoreProfile: baseUrl + 'getMyCoreProfile',
  // 结算统计
  getBalanceCountArea: baseUrl + 'getBalanceCountArea',
  // 设置收款信息
  addPaymentAccountInfoSet: baseUrl + 'addPaymentAccountInfoSet',
  // 更新收款信息
  updatePaymentAccountInfo: baseUrl + 'updatePaymentAccountInfo',
  // 获取收款信息
  getPaymentAccountInfo: baseUrl + 'getPaymentAccountInfo',
  getUploadToken: '/upload/qiniu/upToken',
  getStoreClassSet: baseUrl + 'getStoreClassSet',
  publishStoreArea: baseUrl + 'publishStoreArea',
  logout: '/coach/logout'
}
