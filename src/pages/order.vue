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
      <div class="filter" @click="popupVisible=true">
        <i></i>
        <p>场地筛选</p>
      </div>
    </mt-navbar>
    
    <mt-tab-container id="order_container" v-model="activeTab">
<!--全部-->
        <mt-tab-container-item id="order_all" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <section class="item flex">
          <div>
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492681483&di=d3e5590c70ae67d889e3f8066a8dc722&imgtype=jpg&er=1&src=http%3A%2F%2Fawb.img1.xmtbang.com%2Fcover201606%2F20160621%2Fthumb%2Fe8e0fddddbba4019bb4faac182c5b1ff.jpg" alt="">
          </div>
          <div class="mid">
              <div class="flex">
                <b>增肌课</b>
                <span>Coco</span>
                <p>联系教练</p>
              </div>
              <div>
                <i></i>
                <span>3月27日 12:00-3月27日 13:00</span>
              </div>
              <div>
                <i></i>
                <span>西湖区西溪路325号6幢2楼重创空间一楼(世界联华华商店)</span>
              </div>
          </div>
          <h6>&yen; 20</h6>
        </section>
        </mt-tab-container-item>
<!--已完成-->
        <mt-tab-container-item id="order_finished">
          <mt-cell v-for="n in list" title="tab-container 2"></mt-cell>
        </mt-tab-container-item>
<!--未完成-->
        <mt-tab-container-item id="order_unfinished">
          <mt-cell v-for="n in list" title="tab-container 3"></mt-cell>
        </mt-tab-container-item>

    </mt-tab-container>
    <mt-popup id="filter_popup" position="right" v-model="popupVisible" :modal="true">
      <h4>场地筛选<i class="close" @click="popupVisible=false"></i></h4>
      <section class="flex">
        <img src="https://cn.vuejs.org/images/logo.png" alt="">
        <div>城西银泰乐刻知音点</div>
        <i></i>
      </section>
      <section class="flex">
        <img src="https://cn.vuejs.org/images/logo.png" alt="">
        <div>阿士大夫撒发生的发生的发发送到发送到</div>
        <i></i>
      </section>
      <section class="flex">
        <img src="https://cn.vuejs.org/images/logo.png" alt="">
        <div>城西银泰乐刻知音点</div>
        <i></i>
      </section>
      <mt-button type="default" size="large" @click="cancel">重置</mt-button>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        activeTab: 'order_all',
        list: [1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1],
        popupVisible: false
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
  .flex{
    display:flex;
  }
  #order-page{
    .mint-tabbar{
      position:relative;
    }
    #navbar{
      height:torem(88px);
      .mint-tab-item{
        position:relative;
        border:none;
        color:#000;
        &.is-selected{
          color:$main-color;
          &:after{
            color:$main-color;
            content:'';
            display:block;
            width:torem(120px);
            height:torem(4px);
            background:$main-color;
            position:absolute;
            bottom:torem(4px);
            left:50%;
            transform:translateX(-50%);
          }
        }
      }
      .filter{
        flex:.6;
        >i{
          display:block;
          margin:0 auto;
          width:torem(36px);
          height:torem(36px);
          background:url(../assets/images/pos_filter.png) no-repeat center center / 100% 100%;
          margin-top:torem(10px);
        }
        >p{
          color:rgba(#000,.6);
          font-size:torem(22px);
          margin-top:torem(5px);
        }
      }
    }
  }
  #order_container{
    margin-top:torem(108px);
    .item{
      justify-content:center;
      align-items:center;
      background:#fff;
      padding:torem(40px) 0;
      div:nth-of-type(1){
        width:torem(120px);
        height:torem(120px);
        >img{
          width:100%;
          height:100%;
        }
      }
      >div:nth-of-type(2){
        padding-left:torem(20px);
        width:torem(460px);
        .flex{
          width:100%;
          align-items:center;
          height:torem(50px);
          >b {
            font-size:torem(32px);
            color:#000;
            margin-right:torem(30px);
            position:relative;
            &:after{
              content:'';
              display:block;
              position:absolute;
              top:torem(24px);
              right:torem(-20px);
              width:2px;
              height:2px;
              background:#000;
            }
          }
          >span{
            font-size:torem(26px);
            font-weight:bold;
            vertical-align:bottom;
          }
          >p{
            display:block;
            margin-left:torem(20px);
            width:torem(155px);
            height:torem(40px);
            background-image:url(../assets/images/icon_phone.png) ;
            background-position: torem(10px) center;
            background-repeat:no-repeat;
            background-size:torem(20px) torem(20px);
            padding-left:torem(40px);
            border:torem(1px) solid $main-color;
            border-radius:torem(20px);
            color:$main-color;
            line-height:torem(40px);
            font-size:torem(22px);
          }
        }
        >div:nth-of-type(2),div:nth-of-type(3){
          >i{
            display:inline-block;
            width:torem(24px);
            height:torem(24px);
            background:url(../assets/images/icon_clock.png) no-repeat center center / 100% 100%;
            vertical-align:top;
          }
          color:rgba(#000,.6);
          font-size:torem(22px);
        }
        >div:nth-of-type(3){
          >i{
            background:url(../assets/images/icon_pos.png) no-repeat center center / 100% 100%;
          }
        }
      }
      >h6{
        width:torem(120px);
        font-size:torem(36px);
        color:#000;
        text-align:center;
      }
    }
  }
  #filter_popup{
    width:torem(600px);
    height:100%;
    background-color:#f2f2f2;
    >h4{
      height:torem(105px);
      line-height:torem(105px);
      color:#000;
      font-size:torem(32px);
      text-align:center;
      >.close{
        display:inline-block;
        width:torem(40px);
        height:torem(40px);
        background:url(../assets/images/close.png) no-repeat center center / 100% 100%;
        position:relative;
        left:torem(190px);
        top:torem(5px);
      }
    }
    >section{
      height:torem(116px);
      margin-bottom:torem(20px);
      background:#fff;
      justify-content:space-between;
      align-items:center;
      >img{
        width:torem(116px);
        height:torem(116px);
      }
      >div{
        height:torem(116px);
        line-height:torem(116px);
        font-size:torem(30px);
        width:torem(380px);
        padding-left:torem(20px);
        overflow:hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
      }
      >i {
        width:torem(44px);
        height:torem(44px);
        margin-right:torem(30px);
        background:url(../assets/images/unselected@2x.png) no-repeat center center / 100% 100%;
        &.selected{
          background-image:url(../assets/images/selected@2x.png);
        }
      }
    }
    .mint-button{
      border:none;
      box-shadow:0 0 0 #fff;
      color:$main-color;
      position:absolute;
      bottom:0;
      left:0;
      font-size:torem(30px);
    }
  }
</style>