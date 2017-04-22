<template>
  <div id="space-page">
    <section class="none" v-show="false">
      <img src="../assets/images/space.png" alt="">
      <p>还没有发布过场地</p>
    </section>
    <section class="space_list">
        <div class="item" v-for="item in space.spaceList">
          <div>
            <img :src="item.coverPic" alt="">
          </div>
          <div>
            <h5>{{item.storeName}}</h5>
            <h6 class="active">{{item.status | status}}</h6>
            <p>{{item.address}}</p>
          </div>
          <div>
            <router-link :to="{name: 'spacePublish', params: {id: item.id}}">
              <span>继续发布</span>
            </router-link>
          </div>
        </div>
    </section>
    <router-link :to="{name: 'spaceType'}">
      <span id="space_add" class="icon"></span>
    </router-link>
    <router-view></router-view>
  </div>
</template>
<script>
  import ajax from '../js/tools/ajax'
  import API from '../js/tools/api'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        space: 'getSpace'
      })
    },
    filters: {
      status (v) {
        switch (v) {
          case 1: return '编辑中'
          case 2: return '审核中'
          case 3: return '审核失败'
          case 4: return '已下架'
          case 5: return '营业中'
          case 6: return '停业'
        }
      }
    },
    methods: {
      getSpace () {
        if (!this.space.spaceList.length) {
          ajax(API.getStoreAreaList, {
            token: '8d26bb07f62257fd0858add630e397cb',
            page: 1,
            pageSize: 20
          }, (res) => {
            this.$store.dispatch('pushSpaceList', res.getStoreAreaList.data)
          })
        }
      }
    },
    created () {
      this.getSpace()
    }
  }
</script>
<style lang="scss">
  @import '../css/public';
  #space_add{
    display:block;
    width:torem(120px);
    height:torem(120px);
    position:fixed;
    bottom:torem(140px);
    right:torem(22px);
    background:url(../assets/images/icon_serv.png) no-repeat center center / 100% 100%;
  }
</style>
<style lang="scss" scoped>
  @import '../css/public';
  .none{
    text-align:center;
    img{
      margin-top:torem(60px);
      width:torem(330px);
      height:torem(330px);
    }
    p{
      font-size:torem(28px);
      color:rgba(#000,.6);
    }
  }
  .space_list{
    .item{
      margin-bottom:torem(20px);
      background:#fff;
      padding:torem(30px);
      width:100%;
      display:flex;
      justify-content: space-between;
      align-items:center;
      div:nth-of-type(1){
        width:torem(120px);
        height:torem(120px);
        >img{
          width:100%;
          height:100%;
        }
      }
      div:nth-of-type(2){
        width:torem(374px);
        h5{
          font-size:torem(32px);
        }
        h6{
          font-size:torem(24px);
          line-height:torem(28px);
          padding:torem(5px) 0;
          &:active{
            color:$main-color;
          }
        }
        p{
          font-size:torem(22px);
          color:rgba(#000,.6);
        }
      }
      div:nth-of-type(3){
        width:torem(145px);
        span {
          display:block;
          width:torem(145px);
          height:torem(64px);
          border-radius:torem(6px);
          border:1px solid rgba(#000,.8);
          line-height:torem(64px);
          text-align:center;
          color:rgba(#000,.6);
          &.active{
            color:$main-color;
            border-color:$main-color;
          }
        }
      }
    }
  }
</style>
