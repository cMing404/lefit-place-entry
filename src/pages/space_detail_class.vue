<template>
  <div id="space_detail_calss">
    <article class="list_tit">
      <span>器械类</span>
      <div><i></i><span>全选</span></div>
    </article>
    <mt-checklist v-model="instrVal" :options="instrClass" align="right"></mt-checklist>
    <article class="list_tit">
      <span>器械类</span>
      <div><i class="selected"></i><span>全选</span></div>
    </article>
    <mt-checklist v-model="unInstrVal" :options="unInstrClass" align="right"></mt-checklist>
    <mt-checklist v-model="specialVal" :options="specialClass" align="right"></mt-checklist>
    <mt-button type="primary" size="large" @click="save">保存</mt-button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        instrClass: [
          {
            label: '增肌课',
            value: 1
          },
          {
            label: '减脂课',
            value: 2
          },
          {
            label: '康复课',
            value: 3
          }],
        instrVal: [],
        unInstrClass: ['什么课', '我怎么知道' , '哦'],
        unInstrVal: [],
        specialClass: ['方法', 'feature', '服务'],
        specialVal: []
      }
    },
    methods: {
      save () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="scss">
  @import '../css/public';
</style>
<style lang="scss" scoped>
  @import '../css/public';
  .list_tit{
    display:flex;
    margin-top:torem(40px);
    padding:0 torem(30px);
    justify-content: space-between;
    font-size:torem(26px);
    color:rgba(#000,.8);
    >div{
      >i{
        display:inline-block;
        width:torem(32px);
        height:torem(32px);
        background:url(../assets/images/unselected@2x.png) no-repeat center center / 100% 100%;
        vertical-align:bottom;
        &.selected{
          background-image:url(../assets/images/selected@2x.png);
        }
      }
      >span{
        margin-left:torem(10px);
        color:rgba(#000,.5);
        vertical-align:top;
      }
    }
  }
  .mint-button{
    width:torem(690px);
    margin:torem(20px) auto 0;
  }
</style>