<template>
  <div class="space_detail_base">
    <mt-field label="场地标题" placeholder="例如:杭州文二路世纪联华地下店" v-model="spaceTitle" :attr="{maxlength: 16}" type="text"></mt-field>
    <mt-field label="联系电话" placeholder="场地的联系电话" v-model="phone" type="number"></mt-field>
    <mt-field label="联系人" placeholder="场地联系人的姓名" v-model="operatorName"></mt-field>

    <mt-cell title="场地类型" :value="showTypeName" is-link @click.native="typePopup=true"></mt-cell>
    <mt-cell class="is_out"  title="是否室外" :value="isOut === 1 ? '室外' : isOut===0 ? '室内' : '请选择'" is-link @click.native="sheetVisible=true"></mt-cell>

    <mt-popup class="bottom_popup" v-model="typePopup" position="bottom" :closeOnClickModal="false" :modal="true">
      <div class="box">
        <span @click="closeTypePopup(0)">取消</span>
        <span @click="closeTypePopup(1)">确认</span>
      </div>
      <mt-picker ref="typePicker" :valueKey="'name'" :slots="slots" :visibleItemCount="3" v-model="spaceType" @change="onValuesChange"></mt-picker>
    </mt-popup>
    <mt-actionsheet :actions="actions" v-model="sheetVisible" :closeOnclickModal="false" :canvelText="'取消'"></mt-actionsheet>

    <div class="area_info">
      <mt-cell title="场地可用空间"></mt-cell>
      <div class="info_list">
        <div class="item" v-for="(item, index) in roomList" v-if="roomList.length" @click.self="editRoom(index)">
          <i class="icon" @click="roomList.splice(index, 1)"></i>
          <b>{{item.spaceName}}</b>
          <s></s>
          <span>{{item.spaceArea}}m<sup>2</sup></span>
          <i class="icon"></i>
        </div>
        <img v-if="!roomList.length" src="../../assets/images/space.png" alt="">
        <mt-button size="small" @click.native="editRoom()" type="default">添加空间</mt-button>
        <p>注：场地可用空间用于向用户解释，场地包含的各区域及大小，可只填写一个总面积。如：私教室--200平方米</p>
      </div>
    </div>

    <mt-popup id="space_popup" v-model="spacePopup.show" :closeOnClickModal="false" position="bottom">
      <div class="space_popup_content">
        <h5>添加空间</h5>
        <mt-field label="空间名称" placeholder="如无特殊需求,可直接填写总面积" v-model="spacePopup.spaceName" type="text"></mt-field>
        <mt-field label="空间面积" placeholder="空间对应的面积大小,如40m²" v-model="spacePopup.spaceArea" type="number"></mt-field>
        <div>
          <mt-button @click.native="spacePopup.show=false" type="default" size="small">取消</mt-button>
          <mt-button @click.native="updateRoomList" type="primary" size="small">确定</mt-button>
        </div>
      </div>
    </mt-popup>
    <mt-button type="primary" size="large" @click="save">保存</mt-button>
    <mt-button type="default" size="large" @click="cancel">取消</mt-button>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        typePopup: false,
        isOutPopup: false,
        slots: [
          {
            flex: 1,
            values: [],
            textAlign: 'center'
          }
        ],
        actions: [
          {
            name: '是',
            method: (v) => {
              this.isOut = 1
            }
          },
          {
            name: '否',
            method: () => {
              this.isOut = 0
            }
          }
        ],
        sheetVisible: false,
        spaceType: {
          value: this.$route.query.type
        },
        isOut: -1,
        spaceTitle: '',
        phone: '',
        operatorName: '',
        phoneTyping: false, // 是否正在输入手机号
        spaceTypeTemp: '请选择', // 临时保存值
        spacePopup: {
          show: false,
          spaceArea: '',
          spaceName: ''
        },
        roomList: [],
        roomIndex: -1
      }
    },
    computed: {
      ...mapGetters({
        spaceTypeList: 'getSpaceType',
        spaceDetail: 'getSpaceDetail',
        token: 'getUserToken'
      }),
      showTypeName () {
        let name = '请选择'
        if (this.spaceType.value) {
          this.spaceTypeList.some(v => {
            if (v.storeAreaTypeKey === this.spaceType.value) {
              name = v.storeAreaTypeName
              return true
            }
          })
        }
        return name
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
      editRoom (index) {
        console.log(index)
        this.spacePopup.show = true
        if (index !== undefined) {
          this.roomIndex = index
          this.spacePopup.spaceArea = this.roomList[this.roomIndex].spaceArea
          this.spacePopup.spaceName = this.roomList[this.roomIndex].spaceName
        } else {
          this.spacePopup.spaceArea = ''
          this.spacePopup.spaceName = ''
        }
      },
      updateRoomList () {
        console.log(this.roomIndex)
        if (!this.spacePopup.spaceArea.length || !this.spacePopup.spaceName.trim()) {
          this.$MsgBox({msg: '请输入空间名称和空间大小'})
          return false
        }
        this.spacePopup.show = false
        if (this.roomIndex >= 0 && this.roomList.length > 0) {
          this.roomList[this.roomIndex].spaceArea = this.spacePopup.spaceArea
          this.roomList[this.roomIndex].spaceName = this.spacePopup.spaceName
          this.roomIndex = -1
        } else {
          this.roomList.push({
            spaceArea: this.spacePopup.spaceArea,
            spaceName: this.spacePopup.spaceName
          })
        }
      },
      save () {
        if (!this.spaceTitle.trim()) {
          this.$MsgBox({msg: '“场地标题”未填写'})
          return false
        }
        if (this.isOut === -1) {
          this.$MsgBox({msg: '“是否室外”未选择'})
          return false
        }
        if (!/^\d+$/.test(this.phone)) {
          this.$MsgBox({msg: '"联系电话"只能包含数字'})
          return false
        }
        if (!this.phone.trim()) {
          this.$MsgBox({msg: '“联系电话”未填写'})
          return false
        }
        if (!this.roomList.length) {
          this.$MsgBox({msg: '“面积信息”未配置'})
          return false
        }
        this.$ajax(this.$API.updateStoreArea, {
          id: this.$route.params.id,
          token: this.token,
          storeAreaBaseInfo: {
            storeName: this.spaceTitle,
            telPhone: this.phone,
            operatorName: this.operatorName,
            isOutdoors: this.isOut,  // 是否户外（0：室内，1：室外, -1 '未选择'）
            areaType: this.spaceType.value,   // 第一步选择的
            addStoreSpaceReqs: this.roomList
          }
        }, data => {
          this.$router.go(-1)
        }, err => {
          this.$MsgBox({msg: err.code + ':服务器跑步去了'})
        }, fail => {
          this.$MsgBox({msg: '服务器跑步去了'})
        })
      },
      cancel () {
        this.$router.go(-1)
      },
      initPicker () {
        let slots = this.spaceTypeList.map((v) => {
          if (v.storeAreaTypeKey === this.spaceType.value) {
            this.spaceTypeTemp = v.storeAreaTypeName
          }
          return {
            name: v.storeAreaTypeName,
            value: v.storeAreaTypeKey
          }
        })
        this.$refs.typePicker.setSlotValues(0, slots)
      },
      detailBaseDeal (data) {
        this.spaceTitle = data.storeAreaBaseInfoResp.storeName || ''
        this.phone = data.storeAreaBaseInfoResp.telPhone || ''
        this.operatorName = data.storeAreaBaseInfoResp.operatorName || ''
        this.isOut = data.storeAreaBaseInfoResp.isOutdoors
        this.spaceType.value = data.storeAreaBaseInfoResp.areaType || this.$route.query.type
        this.roomList = data.storeAreaBaseInfoResp.storeSpaceResps || []
        // // // // // // // // // //
        this.$store.dispatch('pushTypeList').then((res) => {
          this.initPicker()
        }, (err) => {
          this.$MsgBox({msg: err.resultmessage || '服务器跑步去了'})
        })
        // 因为initPick需要mounted 判断需要依赖信息详细数据
      }
    },
    mounted () {
      if (Object.keys(this.spaceDetail).length > 0) {
        this.detailBaseDeal(this.spaceDetail)
      } else {
        this.$store.dispatch('pushSpaceDetail', {id: this.$route.params.id, reload: false}).then(res => {
          this.detailBaseDeal(res)
        }, err => {
          this.$Msgbox({msg: err.resultmessage || '服务器跑步去了'})
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../css/public';
  .space_detail_base{
    background:#f2f2f2;
    height:100%;
    .is_out .mint-cell-value{
      // color:rgba(#000,.8);
    }
    .mint-cell:nth-of-type(4){
      margin-top:torem(20px);
    }
  }
</style>
<style lang="scss" scoped>
  @import '../../css/public';
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
            background:url(../../assets/images/delete.png) no-repeat center center / 100% 100%;
          }
          &:last-of-type{
            pointer-events: none;
            background:url(../../assets/images/arr_right.png) no-repeat center center / torem(12px) torem(22px);
          }
        }
        b,span{
          font-weight:normal;
          pointer-events: none;
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
        font-size:torem(24px);
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
    height:100%;
    width:100%;
    background:transparent;
    .space_popup_content{
      background:#f2f2f2;
      width:torem(690px);
      transform:translate(-50%, -50%);
      position:absolute;
      top:50%;
      left:50%;
      h5{
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
  }
</style>
