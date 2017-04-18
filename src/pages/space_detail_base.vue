<template>
  <div class="space_detail_base">
    <mt-field label="场地标题" placeholder="例如:杭州文二路世纪联华地下店"></mt-field>
    <mt-field label="联系电话" placeholder="场地的联系电话"></mt-field>

    <mt-cell title="场地类型" :value="spaceType ? spaceType : '请选择'" is-link @click.native="typePopup=true"></mt-cell>
    <mt-cell class="is_out" title="是否室外" :value="isOut ? '室外' : '室内'" is-link @click.native="sheetVisible=true"></mt-cell>

    <mt-popup class="bottom_popup" v-model="typePopup" position="bottom" :closeOnClickModal="false" :modal="true">
      <div class="box">
        <span @click="closeTypePopup(0)">取消</span>
        <span @click="closeTypePopup(1)">确认</span>
      </div>
      <mt-picker :slots="slots" :visibleItemCount="3" v-model="spaceType" @change="onValuesChange"></mt-picker>
    </mt-popup>
    <mt-actionsheet :actions="actions" v-model="sheetVisible" :closeOnclickModal="false" :canvelText="'取消'"></mt-actionsheet>

    <div class="area_info">
      <mt-cell title="面积信息"></mt-cell>
      <div class="info_list">
        <div class="item">
          <i class="icon"></i>
          <b>空间名称</b>
          <s></s>
          <span>100m<sup>2</sup></span>
          <i class="icon"></i>
        </div>
        <img v-if="false" src="../assets/images/space.png" alt="">
        <mt-button size="small" @click.native="spacePopup.show=true" type="default">添加空间</mt-button>
        <p>注:面积信息用于向用户解释，场地包含的各区域及大小,可只填写一个总面积。</p>
      </div>
    </div>
    <mt-popup id="space_popup" v-model="spacePopup.show" :closeOnClickModal="false">
      <h5>添加空间</h5>
      <mt-field label="空间名称" placeholder="如无特殊需求,可直接填写总面积"></mt-field>
      <mt-field label="空间面积" placeholder="空间对应的面积大小,如40m²"></mt-field>
      <div>
        <mt-button type="default" size="small">取消</mt-button>
        <mt-button type="primary" size="small">确定</mt-button>
      </div>
    </mt-popup>
    <mt-button type="primary" size="large" @click="save">保存</mt-button>
    <mt-button type="default" size="large" @click="cancel">取消</mt-button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        typePopup: false,
        isOutPopup: false,
        slots: [
          {
            flex: 1,
            values: ['游泳池', '高尔夫', '酒店室内'],
            textAlign: 'center'
          }
        ],
        actions: [
          {
            name: '是',
            method: (v) => {
              this.isOut = true
            }
          },
          {
            name: '否',
            method: () => {
              this.isOut = false
            }
          }
        ],
        sheetVisible: false,
        spaceType: '',
        isOut: true,
        spaceTypeTemp: '请选择', // 临时保存值
        spacePopup: {
          show: false
        }
      }
    },
    methods: {
      onValuesChange (picker, values) {
        this.spaceTypeTemp = values[0]
      },
      closeTypePopup (n) {
        // n = 0 取消 n=1 确认
        if (n) {
          this.spaceType = this.spaceTypeTemp
        }
        this.typePopup = false
      },
      save () {
        this.$router.go(-1)
      },
      cancel () {
        this.$router.go(-1)
      }
    },
    created () {
    }
  }
</script>
<style lang="scss">
  @import '../css/public';
  .space_detail_base{
    background:#f2f2f2;
    height:100%;
    .is_out .mint-cell-value{
      color:rgba(#000,.8);
    }
    .mint-cell:nth-of-type(3){
      margin-top:torem(20px);
    }
  }
</style>
<style lang="scss" scoped>
  @import '../css/public';
  .mint-button{
    &:first-of-type{
      margin-top:torem(60px);
    }
    margin-bottom:torem(20px);
  }
  .mint-button{
    width:torem(690px);
    margin:0 auto torem(20px);
  }
  .area_info{
    background:#fff;
    margin-top:torem(20px);
    padding-bottom:torem(40px );
    .info_list{
      .item{
        align-items:center;
        justify-content:space-between;
        height:torem(88px);
        line-height:torem(88px);
        padding:0 torem(30px);
        position:relative;
        &:after{
          content:'';
          display:block;
          border-bottom:torem(1px) solid rgba(#000,.1);
          width:97%;
          position:absolute;
          bottom:0;
          right:0;
        }
        display:flex;
        i.icon{
          width:torem(42px);
          height:torem(42px);
          &:first-of-type{
            background:url(../assets/images/delete.png) no-repeat center center / 100% 100%;
          }
          &:last-of-type{
            background:url(../assets/images/arr_right.png) no-repeat center center / torem(12px) torem(22px);
          }
        }
        b,span{
          font-weight:normal;
          font-size:torem(30px);
          color:rgba(#000,.6);
        }
        s{
          width:torem(1px);
          height:torem(40px);
          background:rgba(#000,.1);
        }
      }
       text-align:center;
        img{
        width:torem(160px);
        display:block;
        margin:torem(40px) auto 0;
        height:torem(160px);
      }
      p{
        font-size:torrem(24px);
        color:rgba(#000,.3);
        width:torem(520px);
        margin:0 auto;
      }
      .mint-button{
        font-size:torem(26px);
        width:torem(195px);
        margin-top:torem(20px);
      }
    }
  }
  #space_popup{
    width:torem(690px);
    background:#f2f2f2;
    >h5{
      line-height:torem(116px);
      font-size:torem(40px);
      text-align:center;
      font-weight:normal;
    }
    div{
      text-align:center;
      padding-bottom:torem(40px);
      .mint-button {
        width:torem(305px);
        height:torem(88px);
        &:first-of-type{
          margin-right:torem(15px);
        }
      }
    }
    
  }
</style>