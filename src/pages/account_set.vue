<template>
  <div id="account_page">
    <aside class="noti" v-show="true">
      <span class="icon info"></span>
      <p>提示:填写错误可能会收不到钱哦</p>
      <span class="icon close"></span>
    </aside>
    <mt-field label="开户银行" placeholder="请填写开户银行名或支付宝" v-model="bankName"></mt-field>
    <mt-field label="银行卡号" placeholder="请填写银行卡号或支付宝账号" v-model="bankCardNo" type="number"></mt-field>
    <mt-field label="开户姓名" placeholder="请填写收款人真实姓名" v-model="subBankName"></mt-field>
    <mt-button type="primary" size="large" @click="save">保存</mt-button>
    <mt-button type="default" size="large" @click="cancel">取消</mt-button>
  </div>
</template>
<script>
  import ajax from '../js/tools/ajax'
  import API from '../js/tools/api'

  export default {
    data () {
      return {
        bankName: '',
        bankCardNo: '',
        userName: '',
        subBankName: '',
        coundId: undefined
      }
    },
    methods: {
      save () {
        let id = this.coundId ? this.coundId : undefined
        ajax(API[id ? 'updatePaymentAccountInfo' : 'addPaymentAccountInfoSet'], {
          [id === undefined ? '' : 'id']: id,
          token: '',
          bankName: this.bankName,
          bankCardNo: this.bankCardNo,
          userName: this.userName,
          subBankName: this.subBankName
        }, res => {
          this.$router.go(-1)
        })
      },
      cancel () {
        this.$router.go(-1)
      },
      getPaymentAccountInfo () {
        ajax(API.getPaymentAccountInfo, {token: '8d26bb07f62257fd0858add630e397cb'}, res => {
          this.bankName = res.getPaymentAccountInfo.data.bankName
          this.bankCardNo = res.getPaymentAccountInfo.data.bankCardNo
          this.userName = res.getPaymentAccountInfo.data.userName
          this.subBankName = res.getPaymentAccountInfo.data.subBankName
          this.coundId = res.getPaymentAccountInfo.data.id
        })
      }
    },
    created () {
      this.getPaymentAccountInfo()
    }
  }
</script>
<style lang="scss" scoped>
  @import '../css/public';
  .noti{
    position:relative;
  }
  .mint-button{
    width:torem(690px);
    margin:0 auto;
    &:first-of-type{
      margin-top:torem(60px);
      margin-bottom:torem(20px);
    }
  }
</style>
