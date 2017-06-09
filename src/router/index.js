import Vue from 'vue'
import Router from 'vue-router'
import Space from '../pages/space.vue'
import Order from '../pages/order.vue'
import User from '../pages/user.vue'
import Count from '../pages/count.vue'
const AccountSet = resolve => require(['../pages/account_set.vue'], resolve)
const SpaceType = resolve => require(['../pages/space_type.vue'], resolve)
const SpacePublish = resolve => require(['../pages/space_publish.vue'], resolve)
const SpaceDetail = resolve => require(['../pages/space_detail/space_detail.vue'], resolve)
const SpaceDetailBase = resolve => require(['../pages/space_detail/space_detail_base.vue'], resolve)
const SpaceDetailMap = resolve => require(['../pages/space_detail/space_detail_map.vue'], resolve)
const SpaceDetailClass = resolve => require(['../pages/space_detail/space_detail_class.vue'], resolve)
const SpaceDetailPhoto = resolve => require(['../pages/space_detail/space_detail_photo.vue'], resolve)
const SpaceDetailSuit = resolve => require(['../pages/space_detail/space_detail_suit.vue'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'space',
      // component: Space
      redirect: '/space'
    },
    {
      // 场地页
      path: '/space',
      name: 'space',
      component: Space,
      // 底部栏是否隐藏
      meta: {tabShow: true}
    },
    {
      // 场地类型页
      path: '/space/type',
      name: 'spaceType',
      component: SpaceType
    },
    {
      // 场地编辑/查看
      path: '/spacePublish:id',
      component: SpacePublish,
      meta: {tabShow: false},
      children: [
        {
          path: '',
          name: 'spaceDetail',
          component: SpaceDetail,
          meta: {tabShow: false}
        },
        {
          path: 'photo',
          name: 'spaceDetailPhoto',
          component: SpaceDetailPhoto,
          meta: {tabShow: false}
        },
        {
          path: 'base',
          name: 'spaceDetailBase',
          component: SpaceDetailBase,
          meta: { tabShow: false }
        },
        {
          path: 'map',
          name: 'spaceDetailMap',
          component: SpaceDetailMap,
          meta: {tabShow: false}
        },
        {
          path: 'class',
          name: 'spaceDetailClass',
          component: SpaceDetailClass,
          meta: {tabShow: false}
        },
        {
          path: 'suit',
          name: 'spaceDetailSuit',
          component: SpaceDetailSuit,
          meta: {tabShow: false}
        }
      ]
    },
    {
      // 订单页
      path: '/order',
      name: 'order',
      component: Order,
      meta: {tabShow: true}
    },
    {
      // 我的
      path: '/user',
      name: 'user',
      component: User,
      meta: {tabShow: true}
    },
    {
      // 结算统计
      path: '/count',
      name: 'count',
      component: Count,
      meta: {tabShow: false}
    },
    {
      // 收款设置
      path: '/accountSet',
      name: 'accountSet',
      component: AccountSet,
      meta: {tabShow: false}
    }
  ]
})
