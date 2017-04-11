<template>
  <transition name="slide-up-down">
    <mt-tabbar id="tabbar" v-show="tabShow" fixed>
      <mt-tab-item @click.native="router('/order')" id="order" :class="{active: currentRoute==='order'}">
        <img slot="icon" src="">
        订单
      </mt-tab-item>
      <mt-tab-item @click.native="router('/space')" id="space" :class="{active: currentRoute==='space'}">
        <img slot="icon" src="">
        场地
      </mt-tab-item>
      <mt-tab-item @click.native="router('/user')" id="user" :class="{active: currentRoute==='user'}">
        <img slot="icon" src="">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </transition>
</template>
<script>
  export default {
    name: 'tabbar',
    data () {
      return {
        currentRoute: '',
        tabShow: true
      }
    },
    watch: {
      '$route': 'update'
    },
    methods: {
      router (item) {
        this.$router.push({path: item})
        this.currentRoute = item.replace(/\//, '')
      },
      switchBtn () {
        this.tabShow = !this.tabShow
      },
      update () {
        if (this.$route.meta.hasOwnProperty('tabShow')) {
          this.tabShow = this.$route.meta.tabShow
        } else {
          this.tabShow = true
        }
      }
    },
    created () {
      this.currentRoute = this.$router.currentRoute.name
      this.update()
    }
  }
</script>
<style lang="scss" scoped>
  .active{
    color:red;
  }
  #tabbar{
    .hideTab{
      transition:transform .3s linear;
      transform:translateY(-100%);
    }
  }
  
</style>