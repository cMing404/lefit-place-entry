// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './js/tools/jsBridge'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
// import FastClick from 'fastclick' // 会与mint那个小婊砸的输入框冲突
import MsgBox from './js/plugins/msgbox/msg-box'
import AMap from 'AMap'
import placeMap from 'placeMap'
import util from './js/plugins/util'
import EXIF from 'EXIF'
import store from './store'
import API from './js/tools/api'
import ajax from './js/tools/ajax'
Vue.prototype.$API = API
Vue.prototype.$ajax = ajax
import AlloyFinger from 'alloyfinger'
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue'
Vue.use(AlloyFingerVue, {
  AlloyFinger
})
// 必须使用common写法
// 这里改写了mint的css样式
import './css/mint-iconfont.css'
// import './css/mint.scss'
// if ('addEventListener' in document) {
// 	document.addEventListener('DOMContentLoaded', function() {
// 		FastClick.attach(document.body);
// 	}, false);
// }
Vue.config.productionTip = false
/* eslint-disable no-new */
import { LeImgCutUpload, LeImgLoad } from 'lefit-ui'
Vue.component(LeImgCutUpload.name, LeImgCutUpload)
Vue.use(LeImgLoad)

import { Tabbar, TabItem, Header, Button, TabContainer, TabContainerItem, Navbar, Cell, InfiniteScroll, Popup, Field, Picker, Actionsheet, Checklist, DatetimePicker, Radio, Swipe, SwipeItem } from 'mint-ui'
// js组件用Vue.use css组件用Vue.component
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(TabContainer.name, TabContainer)
Vue.component(Navbar.name, Navbar)
Vue.component(Cell.name, Cell)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Popup.name, Popup)
Vue.component(Field.name, Field)
Vue.component(Picker.name, Picker)
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Checklist.name, Checklist)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Radio.name, Radio)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.use(InfiniteScroll)
Vue.use(AMap)
Vue.use(Vuex)
Vue.use(MsgBox)
Vue.use(util)
Vue.use(AlloyFingerVue)
import './js/tools/filters'

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')