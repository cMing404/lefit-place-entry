<template>
  <div class="space_detail_base">
    <mt-field label="场地标题" placeholder="例如:杭州文二路世纪联华地下店"></mt-field>
    <mt-field label="场地面积" placeholder="场地总课使用面积"></mt-field>
    <mt-field label="联系电话" placeholder="场地的联系电话"></mt-field>

    <mt-cell title="场地类型" value="请选择" is-link @click.native="selectType"></mt-cell>
    <mt-cell class="is_out" title="是否室外" value="室外" is-link @click.native="selectType"></mt-cell>

    <mt-popup v-model="typePopup" position="bottom" :closeOnClickModal="false" :modal="true">
      <div class="box">
        <span>取消</span>
        <span @click="closeTypePopup">确认</span>
      </div>
      <mt-picker :slots="slots" :visibleItemCount="3" v-model="spaceType" @change="onValuesChange"></mt-picker>
    </mt-popup>
    <mt-button type="primary" size="large">保存</mt-button>
    <mt-button type="default" size="large">取消</mt-button>
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
        spaceType: ''
      }
    },
    methods: {
      selectType () {
        this.typePopup = true
      },
      onValuesChange (picker, values) {
        this.spaceType = values[0]
      },
      closeTypePopup () {
        this.typePopup = false
      }
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
  .mint-popup{
    width:100%;
    .box{
      display:flex;
      color:rgba(#000,.8);
      padding:torem(10px) torem(20px);
      font-size:torem(30px);
      justify-content:space-between;
    }
  }
</style>