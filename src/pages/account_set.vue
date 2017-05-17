<template>
  <div id="account_page">
    <aside class="noti" v-show="true">
      <span class="icon info"></span>
      <p>提示:填写错误可能会收不到钱哦</p>
      <span class="icon close"></span>
    </aside>
    <mt-field label="开户银行" placeholder="请填写开户银行名或支付宝" v-model="bankName"></mt-field>
    <mt-field label="开户支行" placeholder="请填写开户支行名" v-model="subBankName"></mt-field>
    <mt-field label="银行卡号" placeholder="请填写银行卡号或支付宝账号" v-model="bankCardNo" type="number"></mt-field>
    <mt-field label="开户姓名" placeholder="请填写收款人真实姓名" v-model="userName"></mt-field>
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
        if (!this.bankName.trim()) {
          this.$MsgBox({msg: '"开户银行"未填写'})
          return false
        }
        if (!this.bankCardNo.trim()) {
          this.$MsgBox({msg: '"银行卡号"未填写'})
          return false
        }
        if (!this.userName.trim()) {
          this.$MsgBox({msg: '"开户姓名"未填写'})
          return false
        }
        if (!this.subBankName.trim()) {
          this.$MsgBox({msg: '"开户支行"未填写'})
          return false
        }
        let id = this.coundId ? this.coundId : undefined
        ajax(API[id ? 'updatePaymentAccountInfo' : 'addPaymentAccountInfoSet'], {
          [id === undefined ? '' : 'id']: id,
          token: '',
          bankName: this.bankName,
          bankCardNo: this.bankCardNo,
          userName: this.userName,
          subBankName: this.subBankName
        }, data => {
          this.$router.go(-1)
        }, err => {
          this.$MsgBox({msg: err.code + ':服务器跑步去了'})
        }, fail => {
          this.$MsgBox({msg: '服务器跑步去了'})
        })
      },
      cancel () {
        this.$router.go(-1)
      },
      getPaymentAccountInfo () {
        ajax(API.getPaymentAccountInfo, {token: '8d26bb07f62257fd0858add630e397cb'}, data => {
          if (data.list.length) {
            this.bankName = data.list[0].bankName
            this.bankCardNo = data.list[0].bankCardNo
            this.userName = data.list[0].userName
            this.subBankName = data.list[0].subBankName
            this.coundId = data.list[0].id
          }
        }, err => {
          this.$MsgBox({msg: err.code + ':服务器跑步去了'})
        }, fail => {
          this.$MsgBox({msg: '服务器跑步去了'})
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
