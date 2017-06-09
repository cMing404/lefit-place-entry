<template>
  <div class="type_list">
    <div class="banner">
      <img src="../assets/images/space.png" alt="">
      <p>想要发布什么类型的场地?</p>
    </div>
      <mt-cell v-for="item in spaceTypeList" :key="item.storeAreaTypeKey" @click.native="addSpace(item.storeAreaTypeKey)" :title="item.storeAreaTypeName" is-link></mt-cell>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        // 场地类型
        oneClick: false,
        clickOver: true
      }
    },
    computed: {
      ...mapGetters({
        spaceTypeList: 'getSpaceType',
        token: 'getUserToken'
      })
    },
    methods: {
      addSpace (type) {
        if (this.oneClick || !this.clickOver) {
          return false
        }
        this.clickOver = false
        this.$ajax(this.$API.addStoreArea,{
          storeAreaTypeKey: type,
          token: this.token
        }, (data) => {
          this.oneClick = true
          this.clickOver = true
          this.$router.replace({
            name: 'spaceDetail',
            params: {
              id: data.id
            },
            query: {
              type: type
            }
          })
        }, err => {
          this.clickOver = true
          this.$MsgBox({msg: err.code + ':服务器跑步去了'})
        }, fail => {
          this.clickOver = true
          this.$MsgBox({msg: '服务器跑步去了'})
        })
      }
    },
    created () {
      this.$store.dispatch('pushTypeList')
    }
  }
</script>
<style lang="scss" >
  @import  '../css/public';
  
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
  .type_list{
    padding-bottom:torem(110px);
  }
</style>
