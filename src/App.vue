<template>
  <div id="app">
    <mt-button type="default" @click="switchShow">切换隐藏tabbar</mt-button>
    <transition name="component-fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <tabbar ref="tabbar" fixed></tabbar>
  </div>
</template>

<script>
import ajax from './js/tools/ajax'
import API from './js/tools/api'
import Tabbar from './components/tabbar'
export default {
  name: 'app',
  data () {
    return {
      name: 'test'
    }
  },
  methods: {
    switchShow () {
      this.$refs.tabbar.switchBtn()
    }
  },
  created () {
    ajax(API.getStores, {lat: '39.999802', lng: '116.478241'}, (res) => {
    })
  },
  components: {
    Tabbar
  }
}
</script>

<style lang="scss">
@import './css/public.scss';
@import './css/animation';
#app {
  font-size:torem(24px);
}
</style>
