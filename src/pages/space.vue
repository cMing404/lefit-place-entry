<template>
  <div id="space-page">
   <section class="none" v-show="!space.spaceList.length">
      <img src="../assets/images/space.png" alt="">
      <p>还没有发布过场地</p>
      <router-link :to="{name: 'spaceType'}" v-if="!space.spaceList.length">
        <mt-button type="primary" size="large">
        <img src="../assets/images/icon_add.png" alt="">
          添加新场地
        </mt-button>
      </router-link>
    </section>
    <section class="space_list" v-infinite-scroll="getSpace"
            infinite-scroll-disabled="loading"
            infinite-scroll-immediate-check="false"
            infinite-scroll-distance="20">
        <div class="tips" v-if="space.spaceList.length">
          <i class="icon"></i>
          <span>如有疑问,请<a href="#" @click.prevnet="adPopupShow=true">查看帮助</a></span>
        </div>
        <div class="item" v-for="item in space.spaceList">
          <div>
            <img :src="item.coverPic" alt="">
          </div>
          <div>
            <h5>{{item.storeName || '未命名的场地'}}</h5>
            <h6 class="active">{{item.status | status}}</h6>
            <p>{{item.address}}</p>
          </div>
          <div>
            <router-link :to="{name: 'spaceDetail', params: {id: item.id}}">
              <span>{{item.status > 2 ? '修改信息' : '继续发布'}}</span>
            </router-link>
          </div>
        </div>
    </section>
    <router-link :to="{name: 'spaceType'}" v-if="space.spaceList.length">
      <span id="space_add" class="icon"></span>
    </router-link>
    <router-view></router-view>
    <ad-popup :show="adPopupShow" @close="adClose"></ad-popup>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import adPopup from '../components/ad_popup'
  import store from 'store'

  export default {
    data () {
      return {
        page: 1,
        adPopupShow: false
      }
    },
    computed: {
      ...mapGetters({
        space: 'getSpace',
        token: 'getUserToken'
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
        this.$ajax(this.$API.getStoreAreaList, {
          token: this.token,
          page: this.page,
          pageSize: 10
        }, (data) => {
          if (!data.list.length || data.list.some(v => v.status === 1)) {
            if (!store.get('adPopup') || !store.get('adPopup').hasShow) {
              this.adPopupShow = true
              store.set('adPopup', {hasShow: true})
            }
          }
          this.$store.dispatch('pushSpaceList', data)
          if (data.list.length > 0) {
            this.page = data.page + 1
          }
        }, err => {
          this.$MsgBox({msg: err.code + ':服务器跑步去了'})
        }, fail => {
          // this.$MsgBox({msg: '服务器跑步去了'})
        })
      },
      adClose () {
        this.adPopupShow = false
      }
    },
    components: {
      adPopup
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.page = 1
        vm.getSpace()
      })
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
  #space-page{
    height:100vh;
  }
  .space_list{
    overflow:auto;
    -webkit-overflow-scrolling: touch;
  }
</style>
<style lang="scss" scoped>
  @import '../css/public';
  .none{
    text-align:center;
    >img{
      margin-top:torem(60px);
      width:torem(330px);
      height:torem(330px);
    }
    p{
      font-size:torem(28px);
      color:rgba(#000,.6);
    }
    .mint-button {
      margin:torem(30px) auto 0;
      width:torem(690px);
      img {
        width:torem(38px);
        height:torem(38px);
        vertical-align:bottom;
        margin-right: torem(5px);
      }
    }
  }
  .space_list{
    padding-bottom:torem(100px);
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
          text-overflow:ellipsis;
          overflow:hidden;
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
    .tips{
      display:flex;
      height:torem(84px);
      padding:0 torem(30px);
      line-height:torem(84px);
      color:rgba(0,0,0,.3);
      font-size:torem(24px);
      align-items:center;
      .icon{
        width:torem(34px);
        height:torem(34px);
        margin-right:torem(10px);
        background:url('../assets/images/icon_help.png') no-repeat center center / 100% 100%;
      }
      a{
        text-decoration:underline;
        color:rgba(0,0,0,.3);
      }
    }
  }
</style>
