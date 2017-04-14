<template>
  <div id="account_page">
    <aside class="noti" v-show="true">
      <span class="icon info"></span>
      <p>提示:填写错误可能会收不到钱哦</p>
      <span class="icon close"></span>
    </aside>
    <mt-field label="开户银行" placeholder="请填写开户银行名或支付宝"></mt-field>
    <mt-field label="银行卡号" placeholder="请填写银行卡号或支付宝账号"></mt-field>
    <mt-field label="开户姓名" placeholder="请填写收款人真实姓名"></mt-field>
    <mt-button type="primary" size="large" @click="save">保存</mt-button>
    <mt-button type="default" size="large" @click="cancel">取消</mt-button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
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