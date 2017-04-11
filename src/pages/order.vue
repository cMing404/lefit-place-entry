<template>
  <div id="order-page">
    <mt-navbar id="navbar" fixed v-model="activeTab">
      <mt-tab-item id="order_all">
        <img slot="icon" src="">
        全部
      </mt-tab-item>
      <mt-tab-item id="order_finished">
        <img slot="icon" src="">
        已完成
      </mt-tab-item>
      <mt-tab-item id="order_unfinished">
        <img slot="icon" src="">
        未完成
      </mt-tab-item>
    </mt-navbar>
    <mt-tab-container id="order_container" v-model="activeTab">
      <mt-tab-container-item id="order_all"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <mt-cell v-for="n in list" title="tab-container 1"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="order_finished">
        <mt-cell v-for="n in list" title="tab-container 2"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="order_unfinished">
        <mt-cell v-for="n in list" title="tab-container 3"></mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        activeTab: 'order_all',
        list: [1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1]
      }
    },
    methods: {
      loadMore () {
        console.log(1)
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '../css/public';
  #order-page{
    .mint-tabbar{
      position:relative;
    }
  }
  #order_container{
    margin-top:torem(160px);
  }
</style>