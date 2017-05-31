<template>
  <div id="order-page">
    <mt-navbar id="navbar" fixed v-model="activeTab">
      <mt-tab-item id="order_all">
        全部
      </mt-tab-item>
      <mt-tab-item id="order_finished">
        已完成
      </mt-tab-item>
      <mt-tab-item id="order_unfinished">
        未完成
      </mt-tab-item>
      <div class="filter" :class="{active: filterNumber!==null}" @click="popupVisible = true">
        <i></i>
        <p>场地筛选</p>
      </div>
    </mt-navbar>

    <mt-tab-container id="order_container" v-model="activeTab"  v-infinite-scroll="loadMore"
                      infinite-scroll-immediate-check="false"
                      infinite-scroll-disabled="loading"
                      infinite-scroll-listen-for-event="scrollEvent"
                      infinite-scroll-distance="20">
      <!--全部-->
      <mt-tab-container-item id="order_all">
        <section class="order_item flex" v-for="item in getOrderALL.list">
          <div>
            <img :src="item.coverPic">
          </div>
          <div>
            <div class="flex">
              <b>{{item.classInfoName}}</b>
              <i></i>
              <span>{{item.coachStageName}}</span>
              <!--<a v-if="item.coachMobile" :href="'tel:' + item.coachMobile"></a>-->
            </div>
            <div>
              <i></i>
              <span>{{item.appointmentBeginTime | formatTime}} - {{item.appointmentEndTime | formatTime}}</span>
            </div>
            <div>
              <i></i>
              <span>{{item.storeAreaName}}</span>
            </div>
          </div>
          <div>
            <h5>{{item.status === 'IS_FINISHED' || item.status === 'IS_SIGINED' ? '已完成' : '未完成'}}</h5>
            <h6>&yen; {{item.classPrice | formatMoney}}</h6>
          </div>
        </section>
        <div v-if="!getOrderALL.list.length" class="order_none">
          <img src="../assets/images/order_list.png" alt="">
          <p>暂无订单</p>
        </div>
      </mt-tab-container-item>
      <!--已完成-->
      <mt-tab-container-item id="order_finished">
        <section class="order_item flex" v-for="item in getOrderFinished.list">
          <div>
            <img :src="item.coverPic">
          </div>
          <div>
            <div class="flex">
              <b>{{item.classInfoName}}</b><i></i>
              <span>{{item.coachStageName}}</span>
              <!--<a v-if="item.coachMobile" :href="'tel:' + item.coachMobile"></a>-->
            </div>
            <div>
              <i></i>
              <span>{{item.appointmentBeginTime | formatTime}} - {{item.appointmentEndTime | formatTime}}</span>
            </div>
            <div>
              <i></i>
              <span>{{item.storeAreaName}}</span>
            </div>
          </div>
          <div>
            <h5>{{item.status === 'IS_FINISHED' || item.status === 'IS_SIGINED' ? '已完成' : '未完成'}}</h5>
            <h6>&yen; {{item.classPrice | formatMoney}}</h6>
          </div>
        </section>
        <div v-if="!getOrderFinished.list.length" class="order_none">
          <img src="../assets/images/order_list.png" alt="">
          <p>暂无订单</p>
        </div>

      </mt-tab-container-item>

      <!--未完成-->
      <mt-tab-container-item id="order_unfinished">
        <section class="order_item flex" v-for="item in getOrderUnfinished.list">
          <div>
            <img :src="item.coverPic">
          </div>
          <div>
            <div class="flex">
              <b>{{item.classInfoName}}</b><i></i>
              <span>{{item.coachStageName}}</span>
              <!--<a v-if="item.coachMobile" :href="'tel:' + item.coachMobile"></a>-->
            </div>
            <div>
              <i></i>
              <span>{{item.appointmentBeginTime | formatTime}} - {{item.appointmentEndTime | formatTime}}</span>
            </div>
            <div>
              <i></i>
              <span>{{item.storeAreaName}}</span>
            </div>
          </div>
          <div>
            <h5>{{item.status === 'IS_FINISHED' || item.status === 'IS_SIGINED' ? '已完成' : '未完成'}}</h5>
            <h6>&yen; {{item.classPrice | formatMoney}}</h6>
          </div>
        </section>
        <div v-if="!getOrderUnfinished.list.length" class="order_none">
          <img src="../assets/images/order_list.png" alt="">
          <p>暂无订单</p>
        </div>

      </mt-tab-container-item>

    </mt-tab-container>
    <mt-popup id="filter_popup" position="right" v-model="popupVisible" :modal="true">
      <h4>场地筛选<i class="close" @click="popupVisible=false"></i></h4>
      <section class="flex" v-for="(item, index) in storeAreaList" @click="filterNumber = index;popupVisible=false">
        <img :src="item.coverPic" alt="">
        <div>{{item.storeName}}</div>
        <i :class="{selected: filterNumber === index}"></i>
      </section>
      <mt-button type="default" @click.native="filterNumber=null;popupVisible=false" size="large">重置</mt-button>
    </mt-popup>
  </div>
</template>
<script>
  import ajax from '../js/tools/ajax'
  import API from '../js/tools/api'
  // import {Indicator} from 'mint-ui'
  import moment from 'moment'
  import {mapGetters} from 'vuex'
  moment.locale('zh-cn')
  export default {
    data () {
      return {
        activeTab: '',
        popupVisible: false,
        filterNumber: null,
        loadding: false
      }
    },
    computed: {
      ...mapGetters({
        getOrderALL: 'getOrderALL',
        getOrderFinished: 'getOrderFinished',
        getOrderUnfinished: 'getOrderUnfinished',
        storeAreaList: 'getStoreAreaList',
        token: 'getUserToken'
      })
    },
    watch: {
      activeTab: function (v) {
        switch (v) {
          case 'order_all': this.loadMore()
            break
          case 'order_finished': this.loadMore()
            break
          case 'order_unfinished': this.loadMore()
        }
      },
      filterNumber: function (v) {
        // 过滤的时候page重置为0
        switch (this.activeTab) {
          case 'order_all':
            this.getOrderALL.page = 0
            this.$store.dispatch('pushOrderListAll', {list: [], page: 0})
          case 'order_finished':
            this.getOrderFinished.page = 0
            this.$store.dispatch('pushOrderListFinished', {list: [], page: 0})
            break
          case 'order_unfinished':
            this.getOrderUnfinished.page = 0
            this.$store.dispatch('pushOrderListUnfinished', {list: [], page: 0})
            break
        }
        this.loadMore(v)
      }
      // loadding: function (v) {
      //   if (v) {
      //     Indicator.open()
      //   } else {
      //     Indicator.close()
      //   }
      // }
    },
    methods: {
      loadMore (index) {
        if (this.loadding) return false
        if (index === null || index === undefined) {
          index = this.filterNumber
        }
        let isFinished = undefined, dispatch = 'pushOrderListAll', page = this.getOrderALL.page, pageSize = 10
        switch (this.activeTab) {
          case 'order_finished':
            isFinished = 1
            dispatch = 'pushOrderListFinished'
            page = this.getOrderFinished.page
            break
          case 'order_unfinished':
            isFinished = 0
            dispatch = 'pushOrderListUnfinished'
            page = this.getOrderUnfinished.page
            break
        }
        this.$store.dispatch('loadingTrue')
        ajax(API.getAreaOrderList, {
          token: this.token,
          page: page + 1,
          pageSize: pageSize,
          [index === null || index === undefined ? '' : 'storeAreaId']: this.storeAreaList[index] ? this.storeAreaList[index].storeAreaId : undefined,
          [isFinished !== undefined ? 'isFinished' : '']: isFinished
        }, (data) => {
          this.$store.dispatch('loadingFalse')
          this.$store.dispatch(dispatch, {
            list: data.list,
            page: data.list.length < pageSize ? data.page - 1 : data.page
          })
        }, (err) => {
          this.$store.dispatch('loadingFalse')
          this.$MsgBox({msg: err.code + ':服务器跑步去了'})
        }, () => {
          this.$store.dispatch('loadingFalse')
          this.$MsgBox({msg: '服务器跑步去了'})
        })
      },
      getConditionStoreAreaList () {
        if (this.storeAreaList.length > 0) return false
        ajax(API.getConditionStoreAreaList, {token: this.token}, res => {
          // this.storeAreaList = res.list
          this.$store.dispatch('pushStoreAreaList', res)
        })
      }
    },
    created () {
      this.activeTab = 'order_all'
      this.getConditionStoreAreaList()
    }
  }
</script>
<style lang="scss">
  @import '../css/public';

  .flex {
    display: flex;
  }
  .mint-tab-container{
    overflow:visible;
  }
  .order_none{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    text-align:center;
    >img {
      width:torem(194px);
      height:torem(260px);
      margin-top:torem(60px);
    }
    >p{
      font-size: torem(28px);
      color: rgba(0,0,0,.6);
      margin-top:torem(40px);
    }
  }
  .order_item {
    justify-content: center;
    align-items: center;
    background: #fff;
    padding: torem(40px) 0;
    div:nth-of-type(1) {
      width: torem(120px);
      height: torem(120px);
      > img {
        width: 100%;
        height: 100%;
      }
    }
    > div:nth-of-type(2) {
      padding-left: torem(20px);
      width: torem(460px);
      .flex {
        width: 100%;
        align-items: center;
        height: torem(50px);
        > b {
          font-size: torem(32px);
          height:torem(42px);
          color: #000;
          margin-right: torem(15px);
          position: relative;
          max-width:torem(220px);
          overflow:hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        >i {
          width: 3px;
          height: 3px;
          border-radius:50%;
          background: #000;
        }
        > span {
          font-size: torem(26px);
          font-weight: bold;
          vertical-align: bottom;
          margin-left:torem(15px);
          max-width:torem(220px);
          overflow:hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        > a {
          display: block;
          margin-left: torem(20px);
          // width: torem(155px);
          width: torem(45px);
          height: torem(45px);
          background-image: url(../assets/images/icon_phone.png);
          // background-position: torem(10px) center;
          background-position: center center;
          background-repeat: no-repeat;
          // background-size: torem(20px) torem(20px);
          background-size: 100% 100%;
          padding-left: torem(40px);
          // border: torem(1px) solid $main-color;
          border-radius: torem(20px);
          color: $main-color;
          line-height: torem(40px);
          font-size: torem(22px);
          &.no_phone{
            border-color:rgba(0,0,0,.3);
            color:rgba(0,0,0,.3);
            pointer-events:none;
          }
        }
      }
      > div:nth-of-type(2), div:nth-of-type(3) {
        > i {
          display: inline-block;
          width: torem(24px);
          height: torem(24px);
          background: url(../assets/images/icon_clock.png) no-repeat center center / 100% 100%;
          vertical-align: top;
        }
        color: rgba(#000, .6);
        font-size: torem(22px);
      }
      > div:nth-of-type(3) {
        > i {
          background: url(../assets/images/icon_pos.png) no-repeat center center / 100% 100%;
        }
      }
    }
    >div:nth-of-type(3) {
      height:torem(120px);
      text-align:right;
      >h5{
        font-weight:normal;
        color:rgba(0,0,0,.5);
        font-size:torem(28px);
      }
       > h6 {
        font-size: torem(28px);
        font-weight:bold;
        color: #000;
        margin-top:torem(45px);
      }
    }
  }
</style>
<style lang="scss" scoped>
  @import '../css/public';
  #order-page {
    .mint-tabbar {
      position: relative;
    }
    #navbar {
      height: torem(88px);
      .mint-tab-item {
        position: relative;
        border: none;
        color: #000;
        &.is-selected {
          color: $main-color;
          &:after {
            color: $main-color;
            content: '';
            display: block;
            width: torem(120px);
            height: torem(4px);
            background: $main-color;
            position: absolute;
            bottom: torem(4px);
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
      .filter {
        flex: .6;
         &.active{
          > i {
            background-image: url(../assets/images/pos_filter_active.png);
          }
          >p {
            color:$main-color;
          }
        }
        > i {
          display: block;
          margin: 0 auto;
          width: torem(36px);
          height: torem(36px);
          background: url(../assets/images/pos_filter.png) no-repeat center center / 100% 100%;
          margin-top: torem(10px);
        }
        > p {
          color: rgba(#000, .6);
          font-size: torem(22px);
          margin-top: torem(5px);
        }
      }
    }
  }

  #order_container {
    margin-top: torem(108px);
    padding-bottom:torem(90px);
    overflow:auto;
    min-height:torem(500px);
    webkit-overflow-scrolling: touch;
  }

  .mask {
    position: fixed;
    left: 0;
    top: 0;
  }

  #filter_popup {
    width: torem(600px);
    height: 100%;
    background-color: #f2f2f2;
    > h4 {
      height: torem(105px);
      line-height: torem(105px);
      color: #000;
      font-size: torem(32px);
      text-align: center;
      > .close {
        display: inline-block;
        width: torem(40px);
        height: torem(40px);
        background: url(../assets/images/close.png) no-repeat center center / 100% 100%;
        position: relative;
        left: torem(190px);
        top: torem(5px);
      }
    }
    > section {
      height: torem(116px);
      margin-bottom: torem(20px);
      background: #fff;
      justify-content: space-between;
      align-items: center;
      > img {
        width: torem(116px);
        height: torem(116px);
      }
      > div {
        height: torem(116px);
        line-height: torem(116px);
        font-size: torem(30px);
        width: torem(380px);
        padding-left: torem(20px);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      > i {
        width: torem(44px);
        height: torem(44px);
        margin-right: torem(30px);
        background: url(../assets/images/unselected@2x.png) no-repeat center center / 100% 100%;
        &.selected {
          background-image: url(../assets/images/selected@2x.png);
        }
      }
    }
    .mint-button {
      border: none;
      box-shadow: 0 0 0 #fff;
      color: $main-color;
      position: absolute;
      bottom: 0;
      left: 0;
      font-size: torem(30px);
    }
  }
</style>
