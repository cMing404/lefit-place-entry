<template>
  <div id="count_page">
    <nav class="nav">
      <span><i class="left"></i>查看上月</span>
      <p @click="monthPopup=true">2017年3月</p>
      <span>查看下月<i class="right"></i></span>
    </nav>
    <mt-popup class="bottom_popup" v-model="monthPopup" position="bottom" :closeOnClickModal="false" :modal="true">
      <div class="box">
        <span @click="closeMonthPopup(0)">取消</span>
        <span @click="closeMonthPopup(1)">确认</span>
      </div>
      <mt-picker ref="monthPicker" valueKey="text" :slots="slots" :visibleItemCount="5" v-model="countMonth" @change="valueChange"></mt-picker>
    </mt-popup>

    <section class="data_board">
      <div>
        <p>场地收入(元)</p>
        <b>1000.35</b>
      </div>
      <div>
        <p>订单总数</p>
        <b>1090000</b>
      </div>
    </section>

    <section class="order_item flex">
      <div>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492681483&di=d3e5590c70ae67d889e3f8066a8dc722&imgtype=jpg&er=1&src=http%3A%2F%2Fawb.img1.xmtbang.com%2Fcover201606%2F20160621%2Fthumb%2Fe8e0fddddbba4019bb4faac182c5b1ff.jpg" alt="">
      </div>
      <div>
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
    <section class="order_item flex">
      <div>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492681483&di=d3e5590c70ae67d889e3f8066a8dc722&imgtype=jpg&er=1&src=http%3A%2F%2Fawb.img1.xmtbang.com%2Fcover201606%2F20160621%2Fthumb%2Fe8e0fddddbba4019bb4faac182c5b1ff.jpg" alt="">
      </div>
      <div>
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
  </div>
</template>
<script>
  import ajax from '../js/tools/ajax'
  import API from '../js/tools/api'
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {
        countMonth: '',
        monthPopup: false,
        pickerVisible: true,
        value4: null,
        slots: [
          {
            flex: 1,
            values: [
              {
                text: '2017年',
                value: 2017
              },
              {
                text: '2018年',
                value: 2018
              }
            ],
            className: 'slot1',
            textAlign: 'center',
            defaultIndex: 0
          },
          {
            divider: true,
            content: '-',
            className: 'slot2'
          },
          {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center',
            defaultIndex: 0
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        getCountData: 'getCountData',
        token: 'getUserToken'
      })
    },
    methods: {
      valueChange (vm, value) {
        this.countMonth = value
      },
      closeMonthPopup (n) {
        if (n) {
          console.log(this.countMonth)
        }
        this.monthPopup = false
      },
      initSlots () {
      },
      getBalanceCountArea () {
        ajax(API.getBalanceCountArea, {
          token: this.token,
          dateTime: 1491926400
        }, res => {
          if (Object.keys(res).length > 0) {
            this.$store.dispatch('pushCountList', res)
          }
        })
      }
    },
    created () {
      this.initSlots()
      this.getBalanceCountArea()
    },
    mounted () {

    }
  }
</script>
<style lang="scss" scoped>
 @import '../css/public';
 .flex{
    display:flex;
  }
  #count_page{
    .nav{
      display:flex;
      text-align:center;
      height:torem(88px);
      line-height:torem(88px);
      background:#33333d;
      color:#fff;
      >span{
        flex:1;
        color:rgba(#fff,.5);
        font-size:torem(22px);
        >i{
          display:inline-block;
          width:torem(15px);
          height:torem(15px);
          border:1px solid rgba(#fff,.5);
          transform:rotate(45deg);
          &.left{
            border-top-width:0;
            border-right-width:0;
          }
          &.right{
            border-bottom-width:0;
            border-left-width:0;
          }
        }
      }
      >p{
        flex:3;
        font-size:torem(26px);
      }
    }
    .data_board{
      display:flex;
      margin-bottom:torem(20px);
      >div{
        flex:1;
        padding:torem(30px);
        background:#fff;
        text-align:center;
        >p{
          font-size:torem(24px);
          color:rgba(#000,.5);
        }
        >b{
          font-size:torem(64px);
          font-weight:normal;
          display:block;
          margin:torem(10px) 0;
        }
      }
    }
    .order_item{
      margin-bottom:torem(20px);
    }
  }
</style>
