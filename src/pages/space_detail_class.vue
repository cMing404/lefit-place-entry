<template>
  <div id="space_detail_calss">
    <article class="list_tit">
      <span></span>
      <div><i></i><span>全选</span></div>
    </article>
    <mt-checklist v-model="classVal" :options="classList" align="right"></mt-checklist>
    <mt-button type="primary" size="large" @click="save">保存</mt-button>
  </div>
</template>
<script>
  import API from '../js/tools/api'
  import ajax from '../js/tools/ajax'
  export default {
    data () {
      return {
        classSet: null,
        classList: [],
        classVal: [],
        storeId: this.$route.query.type
      }
    },
    methods: {
      save () {
        console.log(this.classVal)
//        this.$router.go(-1)
      },
      getStoreClassSet () {
        ajax(API.getStoreClassSet, {
          storeAreaTypeKey: '',
          storeId: 0
        }, res => {
          let arr = []
          this.classSet = res.getStoreClassSet.data
          this.classList = this.classSet.storeClassSetResps.map(v => {
            v.classIsOpen && arr.push(v.classId)
            return {
              label: v.className,
              value: v.classId
            }
          })
          this.classVal = arr
        })
      }
    },
    created () {
      this.getStoreClassSet()
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
