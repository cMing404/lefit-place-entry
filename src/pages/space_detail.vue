<template>
  <div>
    场地详情{{type}}
    <mt-cell title="基本信息" is-link @click.native="showBasePopup(1)"></mt-cell>
    <mt-cell title="地址配置" is-link @click.native="showBasePopup(2)"></mt-cell>
    <mt-cell title="授课配置" is-link @click.native="showBasePopup(3)"></mt-cell>
    <mt-popup id="popup" v-model="popupVisble"
    modal="true" position="bottom" :closeOnClickModal="false">
      <router-view></router-view>
      <mt-button class="close_pupop" type="default" @click="closePopup">关闭弹窗</mt-button>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    name: 'spaceDetail',
    data () {
      return {
        type: this.$route.params.type,
        popupVisble: false
      }
    },
    methods: {
      showBasePopup (type) {
        switch (type) {
          case 1: this.$router.push({name: 'spaceDetailBase'})
            break
          case 2 :this.$router.push({name: 'spaceDetailMap'})
            break
          case 3 :this.$router.push({name: 'spaceDetailClass'})
            break
        }
        this.popupVisble = true
      },
      closePopup () {
        // this.$router.push({name: 'spaceDetail', params: {type: this.type}})
        this.$router.go(-1)
        this.popupVisble = false
      }
    }
  }
</script>
<style lang="scss">
  @import '../css/public';
  #popup{
    width:100%;
    height:100%;
    .close_pupop{
      margin-top:torem(150px);
    }
  }
  #frame_container{
    width:100%;
    height:100%;
  }
</style>