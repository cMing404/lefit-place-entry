<template>
  <div>
    <div class="banner">
      <img src="../assets//images/space.png" alt="">
      <p>想要发布什么类型的场地?</p>
    </div>
    <router-link v-for="n in 3" :to="{name: 'spaceDetail', params: {type: type}}">
      <mt-cell title="室内场所" is-link></mt-cell>
    </router-link>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        // 场地类型
        type: 4234
      }
    }
  }
</script>
<style lang="scss" >
  @import  '../css/public';
  .mint-cell{
    &:last-child{
      background:#fff;
    }
    &:not(last-of-type):after{
      content:'';
      display:block;
      width:97%;
      height:1px;
      background:rgba(#000,.04);
      position:absolute;
      bottom:0;
      right:0;
    }
    .mint-cell-wrapper{
      background:#fff;
    }
    height:torem(88px);
    .mint-cell-text{
      color:rgba(#000,.8);
      font-size:torem(30px);
    }
    .mint-cell-value{
      color:rgba(#000,.3);
    }
    .mint-cell-allow-right{
      color:rgba(#000,.3);
    }
  }
</style>
<style lang="scss" scoped>
  @import  '../css/public';
  .banner{
    background:#fff;
    height:torem(300px);
    text-align:center;
    margin-bottom:torem(20px);
    >img{
      width:torem(160px);
      margin-top:torem(38px);
      height:torem(160px);
    }
    >p {
      font-size:torem(30px);
      color:rgba(#000,.6);
      margin-top:torem(10px);
    }
  }
</style>