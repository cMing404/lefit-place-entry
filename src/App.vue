<template>
  <div id="app">
    <header-nav></header-nav>
    <transition name="component-fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <tabbar fixed></tabbar>
  </div>
</template>

<script>
import ajax from './js/tools/ajax'
import API from './js/tools/api'
import tabbar from './components/tabbar'
import headerNav from './components/header'
export default {
  name: 'app',
  data () {
    return {
      name: 'test'
    }
  },
  created () {
    ajax(API.getStores, {lat: '39.999802', lng: '116.478241'}, (res) => {
      console.log(res)
    })
  },
  components: {
    tabbar,
    headerNav
  }
}
</script>

<style lang="scss">
@import './css/public.scss';
@import './css/animation';
#app {
  margin-top:torem(80px);
  font-size:torem(24px);
}
</style>
