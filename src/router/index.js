import Vue from 'vue'
import Router from 'vue-router'
import Space from '../pages/space.vue'
import Order from '../pages/order.vue'
import User from '../pages/user.vue'
import SpaceType from '../pages/space_type.vue'
import SpaceDetail from '../pages/space_detail.vue'
import SpaceDetailBase from '../pages/space_detail_base.vue'
import SpaceDetailMap from '../pages/space_detail_map.vue'
import SpaceDetailClass from '../pages/space_detail_class.vue'

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
      path: '/space/detail/:type',
      name: 'spaceDetail',
      component: SpaceDetail,
      meta: {tabShow: false},
      children: [
        {
          path: '/space/detail/:type/base',
          name: 'spaceDetailBase',
          component: SpaceDetailBase,
          meta: {tabShow: false}
        },
        {
          path: '/space/detail/:type/map',
          name: 'spaceDetailMap',
          component: SpaceDetailMap,
          meta: {tabShow: false}
        },
        {
          path: '/space/detail/:type/class',
          name: 'spaceDetailClass',
          component: SpaceDetailClass,
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
    }
  ]
})
