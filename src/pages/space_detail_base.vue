<template>
  <div class="space_detail_base">
    <mt-field label="场地标题" placeholder="例如:杭州文二路世纪联华地下店"></mt-field>
    <mt-field label="场地面积" placeholder="场地总课使用面积"></mt-field>
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
        spaceTypeTemp: '请选择' // 临时保存值
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
</style>