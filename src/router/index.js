import Vue from 'vue'
import Router from 'vue-router'
import Space from '../pages/space.vue'
import Order from '../pages/order.vue'
import User from '../pages/user.vue'

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
      path: '/space',
      name: 'space',
      component: Space
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
