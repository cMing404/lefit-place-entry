<template>
  <mt-popup id="photo_guide_popup" v-model="show" position="bottom" :modal="false" >
    <div class="swiper">
      <mt-swipe :auto="0" :defaultIndex="0">
        <mt-swipe-item>
          <div class="img_wrap">
            <img src="../../assets/images/门头形象.png" alt="">
          </div>
          <h4>门头照片</h4>
          <p>请上传啥地方的发生</p>
        </mt-swipe-item>
        <mt-swipe-item>
          <div class="img_wrap">
            <img src="../../assets/images/门头形象.png" alt="">
          </div>
          <h4>门头照片</h4>
          <p>请上传啥地方的发生</p>
        </mt-swipe-item>
        <mt-swipe-item>
          <div class="img_wrap">
            <img src="../../assets/images/门头形象.png" alt="">
          </div>
          <h4>门头照片</h4>
          <p>请上传啥地方的发生</p>
        </mt-swipe-item>
        <mt-swipe-item>
          <div class="img_wrap">
            <img src="../../assets/images/门头形象.png" alt="">
          </div>
          <h4>门头照片</h4>
          <p>请上传啥地方的发生</p>
          <mt-button type="primary" @click="close">上传图片</mt-button>
        </mt-swipe-item>
      </mt-swipe>
    </div>
  </mt-popup>
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
  @import '../../css/public';
  #photo_guide_popup{
    background:#f2f2f2;
    width:100%;
    height:100%;
    padding-top:torem(50px);
    .swiper{
      width:100%;
      height:100%;
      .mint-swipe{
        width:100%;
        height:100%;
      }
      .mint-swipe-item{
        width:100%;
        height:100%;
        text-align:center;
        .img_wrap{
          width: torem(650px);
          height: torem(650px);
          margin:0 auto;
          position:relative;
          &:before{
            content:'示例';
            display:block;
            width:torem(100px);
            heiht:torem(50px);
            background:$main-color;
            color:#fff;
            font-size:torem(30px);
            line-height:torem(50px);
            position:absolute;
            top:0;
            left:0;
          }
          img{
            width:100%;
            height:100%;
          }
        }
        h4{
          font-size:torem(36px);
          font-weight:bold;
          margin-top:torem(80px);
        }
        .mint-button{
          width:torem(200px);
          margin-top:torem(70px);
        }
        p{
          font-size:torem(28px);
          margin-top:torem(20px);
        }
      }
      .mint-swipe-indicators{
        bottom:torem(80px);
      }
      .mint-swipe-indicator{
        opacity:1;
        width:torem(20px);
        height:torem(20px);
        margin:0 torem(10px);
        background:#fff;
        &.is-active{
          background-color:$main-color;
        }
      }
    }
  }
</style>