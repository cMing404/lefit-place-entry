<template>
  <div id="app">
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
import Tabbar from './components/tabbar'
export default {
  name: 'app',
  data () {
    return {
      name: 'test'
    }
  },
  methods: {
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
body{
  background-color:#f2f2f2;
}
#app {
  font-size:torem(24px);
}
.mint-button{
  font-size:torem(32px);
  border-radius:torem(6px);
  &.mint-button--primary{
    background:$main-color;
  }
  &.mint-button--default{
    background:#fff;
    color:$main-color;
    border:torem(1px) solid $main-color;
  }
}
.mint-cell {
  .mint-cell-title{
    .mint-cell-text{
      vertical-align: top;
    }
    width:auto;
    padding-right:torem(20px);
  }
  .mint-cell-value{
    font-size:torem(30px);
  }
}
</style>
