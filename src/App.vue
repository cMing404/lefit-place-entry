<template>
  <div id="app">
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <tabbar fixed></tabbar>
  </div>
</template>

<script>
import Tabbar from './components/tabbar'
import {mapGetters} from 'vuex'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      token: 'getUserToken'
    })
  },
  methods: {
  },
  created () {
    this.$store.dispatch('pushUserToken', '17b398bde78b35bdb01e73de8a2c13b0')
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
  width:100%;
}
#app {
  width:100%;
  font-size:torem(24px);
  .picker{
    display:block;
    position:relative;
  }
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
.mint-checkbox-input:checked + .mint-checkbox-core,.mint-radio-input:checked + .mint-radio-core{
  background-color:$main-color;
  border-color:$main-color;
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
  .mint-cell-allow-right::after{
    border-right-width:1px;
    border-top-width:1px;
    width:7px;
    height:7px;
  }
}
.bottom_popup {
  &.mint-popup{
    width:100%;
    .box{
      display:flex;
      color:rgba(#000,.8);
      padding:torem(10px) torem(20px);
      font-size:torem(30px);
      justify-content:space-between;
    }
  }
}
.mint-indicator-wrapper{
  font-size:0;
}
.mint-indicator-mask{
  z-index:100;
}
</style>
