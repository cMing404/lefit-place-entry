<template>
  <div id="app">
    <img src="./assets/logo.png">
    <br/>
    <router-view></router-view>
  </div>
</template>

<script>
import ajax from './js/tools/ajax'
import API from './js/tools/api'
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
  }
}
</script>

<style lang="scss">
@import './css/public.scss';
#app {
  >img {
    width:torem(100px);
  }
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size:.6rem;
  .line{
    width:torem(375px);
    height:torem(1px);
    background:#000;
  }
  .time{
    font-size:torem(30px);
  }
}
</style>
