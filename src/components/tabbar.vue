<template>
  <mt-tabbar fixed>
    <mt-tab-item @click.native="router('order')" id="order" :class="{active: currentRoute==='order'}">
      <img slot="icon" src="">
      订单
    </mt-tab-item>
    <mt-tab-item @click.native="router('space')" id="space" :class="{active: currentRoute==='space'}">
      <img slot="icon" src="">
      场地
    </mt-tab-item>
    <mt-tab-item @click.native="router('user')" id="user" :class="{active: currentRoute==='user'}">
      <img slot="icon" src="">
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>
<script>
  // import { Tabbar } from 'mint-ui'
  export default {
    name: 'tabbar',
    data () {
      return {
        currentRoute: ''
      }
    },
    methods: {
      router (item) {
        this.$router.push(item)
        this.currentRoute = item
      }
    },
    created () {
      this.currentRoute = this.$router.currentRoute.name
    },
    components: {
      // Tabbar: Tabbar.name
    }
  }
</script>
<style lang="scss" scoped>
  .active{
    color:red;
  }
</style>