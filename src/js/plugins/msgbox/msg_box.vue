<template>
   <transition name="modal">
  <div class="msg-mask" v-show="show">
     <div class="modal-container">
      <section class="msg-box">
        <img v-show="img" :src="img" alt="">
        <h3>{{tit}}</h3>
        <p>{{msg}}</p>
        <div class="btns">
          <span v-show="no" @click="cancel">取消</span>
          <span @click="confirm" class="confirm">确定</span>
        </div>
      </section>
     </div>
  </div> 
   </transition>
</template>
<script>
  export default {
    data () {
      return {
        msg: '',
        tit: '提示',
        show: false,
        yes: null,
        no: null,
        img: ''
      }
    },
    methods: {
      confirm () {
        this.yes && this.yes()
        this.show = false
      },
      cancel () {
        this.no && this.no()
        this.show = false
      },
      reset () {
        this.msg = ''
        this.tit = '提示'
        this.img = ''
        this.yes = null
        this.no = null
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../css/public';
  .msg-mask{
    position:fixed;
    top:0;
    left:0;
    background:rgba(0,0,0,.6);
    z-index:99999;
    display:table;
    width:100%;
    height:100%;
    transition: opacity .3s ease;
  }
  .modal-container{
    display:table-cell;
    transition: all .3s ease;
    vertical-align:middle;
  }
  .msg-box{
    width:torem(630px);
    background:#fff;
    margin:0 auto;
    border-radius:torem(10px);
    text-align:center;
    z-index:100;
    padding:torem(40px) torem(40px) torem(30px);
    >img{
      max-width:torem(330px);
    }
    >h3{
      font-size:torem(40px);
      font-weight:bold;
      color:rgba(0,0,0,.8);
      padding:torem(30px) 0;
    }
    >p{
      font-size:torem(28px);
      color:rgba(0,0,0,.3);
      height:torem(36px);
    }
    >.btns{
      width:100%;
      display:flex;
      margin-top:torem(60px);
      justify-content:center;
      >span{
        width:48%;
        border:1px solid $main-color;
        height: torem(74px);
        color:$main-color;
        font-size:torem(28px);
        line-height:torem(74px);
        &.confirm{
          background:$main-color;
          color:#fff;
        }
        &:last-of-type{
          margin-left:torem(30px);
        }
      }
    }
  }
</style>