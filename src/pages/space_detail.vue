<template>
  <div id="space_detai">
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

    <mt-cell title="开放时间" class="open_time" @click.native="timePopup=true" is-link></mt-cell>
    <mt-popup class="bottom_popup" v-model="timePopup" position="bottom" :closeOnClickModal="false" :modal="true">
      <div class="box">
        <span @click="closeTimePopup(0)">取消</span>
        <span @click="closeTimePopup(1)">确认</span>
      </div>
      <mt-picker :slots="slots" :visibleItemCount="5" v-model="openTimeVal" @change="selectTime"></mt-picker>
    </mt-popup>

    <mt-cell title="场地状态" value="审核中"></mt-cell>
    <mt-field label="收费金额" placeholder="请输入" type="number"></mt-field>

    <div class="rule">
      <span class="select"></span>
      <p>我已阅读并同意<b>《场地入驻规则》</b></p>
    </div>

    <mt-button type="primary" size="large">发布</mt-button>
    <mt-button type="default" size="large">删除</mt-button>

  </div>
</template>
<script>
  export default {
    name: 'spaceDetail',
    data () {
      return {
        type: this.$route.params.type,
        pickerValue: '',
        openTimeVal: '',
        timePopup: false,
        slots: [
          {
            flex: 1,
            values: ['00', '01', '02', '03', '04', '05', '06', '07'],
            className: 'slot1',
            textAlign: 'center',
            defaultIndex: 5
          },
          {
            divider: true,
            content: ':',
            className: 'slot2'
          },
          {
            flex: 1,
            values: ['00', '01', '02', '03', '04', '05', '06', '07'],
            className: 'slot3',
            textAlign: 'center',
            defaultIndex: 0
          },
          {
            divider: true,
            content: '-',
            className: 'slot2'
          },
          {
            flex: 1,
            values: ['00', '01', '02', '03', '04', '05', '06', '07'],
            className: 'slot3',
            textAlign: 'center',
            defaultIndex: 0
          },
          {
            divider: true,
            content: ':',
            className: 'slot2'
          },
          {
            flex: 1,
            values: ['00', '01', '02', '03', '04', '05', '06', '07'],
            className: 'slot3',
            textAlign: 'center',
            defaultIndex: 0
          }
        ]
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
      },
      openPicker () {
        this.$refs.picker.open()
      },
      handleConfirm (v) {
        console.log(this.pickerValue)
      },
      selectTime (vm, value) {
        console.log(value)
        this.openTimeVal = value
      },
      closeTimePopup (n) {
        // n = 0 取消 n=1 确认
        if (n) {
          console.log(this.openTimeVal)
        }
        this.timePopup = false
      }
    },
    created () {
    }
  }
</script>
<style lang="scss">
  @import '../css/public';
  #space_detai{
  }
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