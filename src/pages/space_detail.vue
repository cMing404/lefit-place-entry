<template>
  <div>
    <aside class="noti" v-show="false">
      <span class="icon info"></span>
      <p>审核说明:照片不合格,请使用真实图片,场地被下架</p>
      <span class="icon close"></span>
    </aside>

    <div class="banner">
      <div class="upload_btn">
        <img src="../assets/images/add_space.png" alt="">
        <p>哥~传个图吧~</p>
      </div>
    </div>

    <mt-cell title="基本信息" value="已完成" is-link @click.native="showBasePopup(1)"></mt-cell>
    <mt-cell title="地址配置" class="unfinished" value="未完成" is-link @click.native="showBasePopup(2)"></mt-cell>
    <mt-cell title="授课配置" class="unfinished" value="未完成" is-link @click.native="showBasePopup(3)"></mt-cell>

    <mt-cell title="开放时间" class="open_time" is-link></mt-cell>
    <mt-cell title="场地状态" value="审核中"></mt-cell>
    <mt-field label="收费金额" class="fee" placeholder="请输入" type="number"></mt-field>

    <div class="rule">
      <span class="select"></span>
      <p>我已阅读并同意<b>《场地入驻规则》</b></p>
    </div>

    <mt-button type="primary" size="large">发布</mt-button>
    <mt-button type="default" size="large">删除</mt-button>

    <mt-popup id="popup" v-model="popupVisble"
    modal="true" position="bottom" :closeOnClickModal="false">
      <router-view></router-view>
      <!--<mt-button class="close_pupop" type="default" @click="closePopup">关闭弹窗</mt-button>-->
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
  .noti{
    display:flex;
    justify-content:space-between;
    padding:0 torem(24px);
    align-items:center;
    background:$main-color;
    color:#fff;
    font-size:torem(24px);
    line-height:torem(88px);
    height:torem(88px);
    position:fixed;
    left:0;
    right:0;
    z-index:1;
    >p {
      width:84%;
    }
    .icon {
      width:torem(40px);
      height:torem(40px);
        background-repeat:no-repeat;
        background-size:100% 100%;
        background-position:center center;
      &.info{
        background-image:url(../assets/images/icon_info.png);
      }
      &.close{
        background-image:url(../assets/images/icon_close.png);
        background-size:50% 50%;
      }
    }
  }
  .unfinished .mint-cell-value{
    color:#000;
  }
  #popup{
    width:100%;
    height:100%;
    .close_pupop{
      margin-top:torem(40px);
    }
  }
  #frame_container{
    width:100%;
    height:100%;
  }
</style>
<style lang="scss" scoped>
  @import '../css/public';
  .mint-cell-value{
    color:#000;
  }
  .banner{
    height:torem(374px);
    position:relative;
    background:#fff;
    margin-bottom:torem(20px);
    .upload_btn{
      position:absolute;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
      >img {
        width:torem(150px);
        heigth:torem(150px);
      }
      >p {
        font-size:torem(26px);
        color:rgba(#000,.6);
        margin-top:torem(20px);
      }
    }
  }
  .open_time{
    margin-top:torem(20px);
  }
  .rule{
    margin-top:torem(20px);
    margin-bottom:torem(60px);
    color:rgba(#000,.3);
    padding-left:torem(30px);
    overflow:hidden;
    >span{
      width:torem(32px);
      height:torem(32px);
      line-height:torem(32px);
      float:left;
      margin-right:torem(10px);
      background:url(../assets/images/unselected@2x.png) no-repeat center center / 100% 100%;
    }
    >p{
      float:left;
      font-size:torem(24px);
      b{
        color:$main-color;
        font-weight:normal;
      }
    }
  }
  .mint-button{
    width:torem(690px);
    margin:0 auto torem(20px);
    &:last-of-type{
      margin-bottom:torem(60px);
    }
  }
</style>