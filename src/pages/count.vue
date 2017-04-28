<template>
  <div id="count_page">
    <nav class="nav">
      <span @click="jumpMonth(-1)"><i class="left"></i>查看上月</span> 
      <p @click="picker.show(undefined)">{{countMonth[0] + '年' + countMonth[1] + '月'}}</p>
      <span @click="jumpMonth(1)">查看下月<i class="right"></i></span>
    </nav>

    <section class="data_board">
      <div>
        <p>场地收入(元)</p>
        <b>{{countData.monthClassIncome || 0}}</b>
      </div>
      <div>
        <p>订单总数</p>
        <b>{{countData.monthOrderNum || 0}}</b>
      </div>
    </section>

    <section class="order_item flex" v-for="item in countData.areaOrderListBeans">
      <div>
        <img src="" alt="">
      </div>
      <div>
          <div class="flex">
            <b>{{item.classInfoName}}</b>
            <span>{{item.coachStageName}}</span>
            <p>联系教练</p>
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
      <h6>&yen; {{item.classPrice}}</h6>
    </section>
  </div>
</template>
<script>
  import ajax from '../js/tools/ajax'
  import API from '../js/tools/api'
  import {mapGetters} from 'vuex'
  import Picker from 'better-picker'
  import moment from 'moment'
  moment.locale('zh-cn')

  export default {
    data () {
      return {
        countMonth: [],
        picker: null
      }
    },
    computed: {
      ...mapGetters({
        countData: 'getCountData',
        token: 'getUserToken'
      })
    },
    filters: {
      formatTime (t) {
        return moment(t).format('MMMDo HH:mm')
      }
    },
    methods: {
      getBalanceCountArea (time) {
        ajax(API.getBalanceCountArea, {
          token: this.token,
          dateTime: time
        }, res => {
          if (Object.keys(res).length > 0) {
            this.$store.dispatch('pushCountList', res)
          }
        }, err => {
          this.$MsgBox({msg: err.resultmessage})
        }, fail => {
          this.$MsgBox({msg: '服务器跑步去了'})
        })
      },
      jumpMonth (index) {
        let timer = moment({
          year: this.countMonth[0],
          month: this.countMonth[1] - 1
        }).add(index, 'M').unix()
        this.getBalanceCountArea(timer)
      },
      initPicker () {
        let now = new Date()
        let _year = now.getFullYear(), _month = now.getMonth()
        let years = [
          {text: '2017年', value: 2017},
          {text: '2018年', value: 2018}
        ]
        let months = []
        if (_year === 2017) {
          for (let i = 5; i < 13; i++) {
            months.push({
              text: i + '月',
              value: i
            })
          }
        } else {
          for (let i = 1; i < 13; i++) {
            months.push({
              text: i + '月',
              value: i
            })
          }
        }
        let defaultSelected = [0, 0]
        for (let i = 0; i < years.length; i++) {
          if (_year === years[i]) {
            defaultSelected[0] = years[i].value
            break
          }
        }
        for (let i = 0; i < months.length; i++) {
          if (_month === months[i]) {
            defaultSelected[1] = months[i].value
            break
          }
        }
        this.countMonth = [years[defaultSelected[0]].value, months[defaultSelected[1]].value]
        this.picker = new Picker({
          data: [years, months],
          selectedIndex: defaultSelected,
          title: ''
        })
        this.picker.on('picker.select', (selectedVal, selectedIndex) => {
          this.countMonth = selectedVal
          let timer = moment({
            year: this.countMonth[0],
            month: this.countMonth[1] - 1
          }).unix()
          this.getBalanceCountArea(timer)
        })
        this.picker.on('picker.change', (selectedVal, selectedIndex) => {
          let month = []
          console.log(this.countMonth)
          if (selectedVal === 0 && selectedIndex === 0) {
            for (let i = 5; i < 13; i++) {
              month.push({
                text: i + '月',
                value: i
              })
            }
          } else {
            for (let i = 1; i < 13; i++) {
              month.push({
                text: i + '月',
                value: i
              })
            }
          }
          this.picker.refillColumn(1, month)
        })
      }
    },
    created () {
      this.initPicker()
      this.getBalanceCountArea(~~(new Date().getTime() / 1000))
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
