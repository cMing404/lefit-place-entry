<template>
  <div id="count_page">
    <nav class="nav">
      <span @click="jumpMonth(-1)" :class="{disabled: !canJumpLeft}"><i class="left"></i>查看上月</span> 
      <!--<p @click="picker.show(undefined)">{{countMonth[0] + '年' + countMonth[1] + '月'}}</p>-->
      <p @click="picker.show(undefined)">{{countMonth | formatMonth}}</p>
      <span @click="jumpMonth(1)" :class="{disabled: !canJumpRight}">查看下月<i class="right"></i></span>
    </nav>

    <section class="data_board">
      <div>
        <p>场地收入(元)</p>
        <b>{{countData.monthClassIncome | formatMoney}}</b>
      </div>
      <div>
        <p>订单总数</p>
        <b>{{countData.monthOrderNum || 0}}</b>
      </div>
    </section>

    <section class="order_item flex" v-for="item in countData.areaOrderListBeans">
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
        <h5>未完成</h5>
        <h6>&yen; {{item.classPrice | formatMoney}}</h6>
      </div>
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
        picker: null,
        canJumpMonth: true,
        getCountOver: true
      }
    },
    computed: {
      ...mapGetters({
        countData: 'getCountData',
        token: 'getUserToken'
      }),
      canJumpLeft () {
        return !(this.picker.selectedIndex[0] === 0 && this.picker.selectedIndex[1] === 0)
      },
      canJumpRight () {
        console.log(this.picker.data[0].length)
        return !(this.picker.selectedIndex[0] === this.picker.data[0].length - 1 && this.picker.selectedIndex[1] === this.picker.data[1].length - 1)
      }
    },
    filters: {
      formatMonth (m) {
        return m[0] + '年' + m[1] + '月'
      }
    },
    methods: {
      getBalanceCountArea (time) {
        if (!this.getCountOver) {
          return false
        }
        this.getCountOver = false
        ajax(API.getBalanceCountArea, {
          token: this.token,
          dateTime: time
        }, data => {
          this.getCountOver = true
          if (Object.keys(data).length > 0) {
            this.$store.dispatch('pushCountList', data)
          }
        }, err => {
          this.getCountOver = true
          this.$MsgBox({msg: err.code + ':服务器跑步去了'})
        }, fail => {
          this.getCountOver = true
          this.$MsgBox({msg: '服务器跑步去了'})
        })
      },
      jumpMonth (index) {
        if (!this.getCountOver) {
          return false
        }
        this.canJumpMonth = true
        let _year = this.countMonth[0] // 临时存储年
        let _month = this.countMonth[1] // 临时存储月
        _month += index
        if (_month === 13) {
          _month = 1
          _year++
        } else if (_month === 0) {
          _month += index
          _year--
        }
        let selectedIndexTemp = []
        this.picker.data[0].forEach((v, i) => {
          if (v.value === _year) {
            selectedIndexTemp[0] = i
          }
        })
        if (selectedIndexTemp[0] === undefined) {
          this.canJumpMonth = false
          return false
        }
        this.picker.data[1].forEach((v, i) => {
          if (v.value === _month) {
            selectedIndexTemp[1] = i
          }
        })
        this.$set(this.countMonth, 0, _year)
        this.$set(this.countMonth, 1, _month)
        this.$set(this.picker.selectedIndex, 0, selectedIndexTemp[0])
        this.$set(this.picker.selectedIndex, 1, selectedIndexTemp[1])
        let timer = moment({
          year: this.countMonth[0],
          month: this.countMonth[1] - 1
        }).unix()
        this.getBalanceCountArea(timer)
      },
      initPicker () {
        let now = new Date()
        let _year = now.getFullYear(), _month = now.getMonth() + 1
        let years = [
          {text: '2017年', value: 2017},
          {text: '2018年', value: 2018}
        ]
        let months = []
        for (let i = 1; i < 13; i++) {
          months.push({
            text: i + '月',
            value: i
          })
        }
        let defaultSelected = [0, 0]
        for (let i = 0; i < years.length; i++) {
          if (_year === years[i].value) {
            defaultSelected[0] = i
            break
          }
        }
        for (let i = 0; i < months.length; i++) {
          if (_month === months[i].value) {
            defaultSelected[1] = i
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
          this.$set(this.picker.selectedIndex, 0, selectedIndex[0])
          this.$set(this.picker.selectedIndex, 1, selectedIndex[1])
          this.countMonth = selectedVal
          let timer = moment({
            year: this.countMonth[0],
            month: this.countMonth[1] - 1
          }).unix()
          this.getBalanceCountArea(timer)
        })
      }
    },
    created () {
      this.initPicker()
      this.getBalanceCountArea(~~(new Date().getTime() / 1000))
    },
    mounted () {
    },
    beforeDestroy () {
      // 清除picker节点防止内存泄漏
      let removeDOM = document.getElementsByClassName('picker')
      if (removeDOM.length > 0) {
        for (let i = 0,len = removeDOM.length; i < len; i++) {
          removeDOM[0].parentNode.removeChild(removeDOM[0])
        }
      }
      this.picker = null
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
        &.disabled{
          color:rgba(255,255,255,.1);
          >i{
            border-color:rgba(255,255,255,.1);
          }
        }
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
