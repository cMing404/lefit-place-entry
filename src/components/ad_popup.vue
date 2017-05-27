<template>
  <div id="ad_popup">
    <mt-popup v-model="show" :modal="true" :closeOnClickModal="false" popup-transition="popup-fade">
      <div class="swiper">
        <mt-swipe :auto="0" :defaultIndex="0">
          <mt-swipe-item>
            <img src="https://cdn.leoao.com/place%E5%85%A5%E9%A9%BB%E7%AB%AF%E5%BC%95%E5%AF%BC_01.png" alt="">
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="https://cdn.leoao.com/place%E5%85%A5%E9%A9%BB%E7%AB%AF%E5%BC%95%E5%AF%BC_02.png" alt="">
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="https://cdn.leoao.com/place%E5%85%A5%E9%A9%BB%E7%AB%AF%E5%BC%95%E5%AF%BC_03.png" alt="">
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="https://cdn.leoao.com/place%E5%85%A5%E9%A9%BB%E7%AB%AF%E5%BC%95%E5%AF%BC_04.png" alt="">
            <a class="btn" href="#" @click.prevent="close">开始入驻赚钱吧~</a>
          </mt-swipe-item>
        </mt-swipe>
        <i class="close" @click="close"></i>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      show: Boolean
    },
    methods: {
      close () {
        this.$emit('close')
      }
    }
  }
</script>
<style lang="scss">
  @import '../css/public';
  #ad_popup{
    .mint-popup {
      background:#fff;
      width:torem(600px);
      height:torem(850px);
      border-radius:torem(12px);
    }
    .swiper{
      height:100%;
      .mint-swipe-items-wrap{
        overflow:hidden;
        background:#fff;
        border-radius:torem(12px);
      }
      .close{
        height:torem(60px);
        width:torem(60px);
        background:url('../assets/images/close_transparent.png') no-repeat center center / 100% 100%;
        display:block;
        position:absolute;
        bottom:torem(-90px);
        left:50%;
        transform:translateX(-50%);
      }
      .mint-swipe-item{
        .btn{
          position:absolute;
          bottom:torem(60px);
          left:50%;
          transform:translateX(-50%);
          width:torem(320px);
          text-align:center;
          height:torem(70px);
          line-height:torem(70px);
          background:$main-color;
          color:#fff;
          font-size:torem(24px);
          border-radius:torem(15px);
          display:block;
          box-shadow:0 torem(15px) torem(30px) torem(5px) rgba($main-color, .3);
        }
        img {
          width:100%;
        }
      }
      .mint-swipe-indicator{
        width:torem(10px);
        height:torem(10px);
        border-radius:50%;
        background:#eee;
        opacity:1;
        &.is-active{
          background:$main-color;
          // box-shadow:0 torem(15px) torem(15px) torem(3px) rgba($main-color, .3);
        }
      }
    }
  }
</style>