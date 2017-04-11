// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AMap from 'AMap'
// import FastClick from 'fastclick'
// 这里改写了mint的css样式
import './css/mint-iconfont.css'
import './css/public.scss'
// import './css/mint.scss'
// if ('addEventListener' in document) {
// 	document.addEventListener('DOMContentLoaded', function() {
// 		FastClick.attach(document.body);
// 	}, false);
// }
Vue.config.productionTip = false
/* eslint-disable no-new */
import { Tabbar, TabItem, Header, Button, TabContainer, TabContainerItem, Navbar, Cell, InfiniteScroll, Popup, Field } from 'mint-ui'
// js组件用Vue.use css组件用Vue.component
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(TabContainer.name, TabContainer)
Vue.component(Navbar.name, Navbar)
Vue.component(Cell.name, Cell)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Popup.name, Popup);
Vue.component(Field.name, Field);
Vue.use(InfiniteScroll)
Vue.use(AMap)
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')