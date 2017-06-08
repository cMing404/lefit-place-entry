<template>
  <div id="user_center">
    <header>
      <p><img :src="myCoreProfile.avatarUrl" alt=""></p>
      <h4>{{myCoreProfile.nickname}}</h4>
    </header>
    <section class="month_data">
      <mt-cell title="本月数据"></mt-cell>
      <p>场地收入(元)</p>
      <b>{{myCoreProfile.monthClassIncome || 0 | formatMoney}}</b>
    </section>
    <section class="cell_group">
      <router-link :to="{name: 'count'}">
        <mt-cell title="结算统计" is-link></mt-cell>
      </router-link>
      <router-link :to="{name:'accountSet'}">
        <mt-cell title="收款设置" is-link></mt-cell>
      </router-link>
      <mt-cell title="客服电话" value="400-150-1866" href="tel:400-150-1866" is-link></mt-cell>
      <a href="http://wx.leoao.com/application/views/about/abouts.html"><mt-cell title="关于我们" is-link></mt-cell></a>
    </section>
    <mt-button type="default" @click="loginOut" size="large">退出登录</mt-button>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        userInfo: {}
      }
    },
    computed: {
      ...mapGetters({
        token: 'getUserToken',
        myCoreProfile: 'getMyCoreProfile'
      })
    },
    methods: {
      getMyCoreProfile () {
        if (!Object.keys(this.myCoreProfile).length) {
          this.$ajax(this.$API.getMyCoreProfile, {
            token: this.token
          }, data => {
            this.$store.dispatch('pushMyCoreProfile', data)
          }, err => {
            this.$MsgBox({msg: err.code + ':服务器跑步去了'})
          }, fail => {
            this.$MsgBox({msg: '服务器跑步去了'})
          })
        }
      },
      loginOut () {
        window.location.href = '/coach/logout'
      }
    },
    created () {
      this.getMyCoreProfile()
    }
  }
</script>
<style lang="scss">
  @import '../css/public';
  #user_center{
    padding-bottom:torem(90px);
    .month_data{
      text-align:center;
      background-color:#fff;
      padding-bottom:torem(40px);
      margin-bottom:torem(20px);
      .mint-cell{
        text-align:left;
        height:torem(66px);
        line-height:torem(66px);
        min-height:auto;
        .mint-cell-wrapper{
          height:torem(66px);
          align-items:center;
        }
        .mint-cell-title{
          color:rgba(#000,.8);
          font-size:torem(26px);
        }
      }
      >p{
        font-size:torem(26px);
        margin-top:torem(40px);
        color:rgba(#000,.6);
      }
      >b{
        display:block;
        font-size:torem(70px);
        font-weight:normal;
        margin:torem(20px) auto 0;
      }
    }
    .cell_group{
      .mint-cell-value{
        color:rgba(#000,.8);
      }
    }
  }
</style>
<style lang="scss" scoped>
  @import '../css/public';
  header{
    text-align:center;
    p{
      width:torem(120px);
      height:torem(120px);
      margin:torem(50px) auto torem(20px);
      overflow:hidden;
      border-radius:50%;
      img{
        width:100%;
        height:100%;
      }
    }
    >h4{
      font-size:torem(32px);
      color:rgba(#000,.8);
      margin-bottom:torem(50px);
    }
  }
  .mint-button--default{
    border-radius:0;
    border-color:#fff;
    margin-top:torem(20px);
    box-shadow:0 0 0 #fff;
  }
</style>
