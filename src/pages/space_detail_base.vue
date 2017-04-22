<template>
  <div class="space_detail_base">
    <mt-field label="场地标题" placeholder="例如:杭州文二路世纪联华地下店" v-model="spaceTitle" type="text"></mt-field>
    <mt-field label="联系电话" placeholder="场地的联系电话" v-model="phone" type="number"></mt-field>

    <mt-cell title="场地类型" :value="showTypeName" is-link @click.native="typePopup=true"></mt-cell>
    <mt-cell class="is_out" title="是否室外" :value="isOut ? '室外' : '室内'" is-link @click.native="sheetVisible=true"></mt-cell>

    <mt-popup class="bottom_popup" v-model="typePopup" position="bottom" :closeOnClickModal="false" :modal="true">
      <div class="box">
        <span @click="closeTypePopup(0)">取消</span>
        <span @click="closeTypePopup(1)">确认</span>
      </div>
      <mt-picker ref="typePicker" :valueKey="'name'" :slots="slots" :visibleItemCount="3" v-model="spaceType" @change="onValuesChange"></mt-picker>
    </mt-popup>
    <mt-actionsheet :actions="actions" v-model="sheetVisible" :closeOnclickModal="false" :canvelText="'取消'"></mt-actionsheet>

    <div class="area_info">
      <mt-cell title="面积信息"></mt-cell>
      <div class="info_list">
        <div class="item" v-for="(item, index) in roomList" v-if="roomList.length" @click.self="editRoom(index)">
          <i class="icon" @click="roomList.splice(index, 1)"></i>
          <b>{{item.spaceName}}</b>
          <s></s>
          <span>{{item.spaceArea}}2<sup>2</sup></span>
          <i class="icon"></i>
        </div>
        <img v-if="!roomList.length" src="../assets/images/space.png" alt="">
        <mt-button size="small" @click.native="editRoom()" type="default">添加空间</mt-button>
        <p>注:面积信息用于向用户解释，场地包含的各区域及大小,可只填写一个总面积。</p>
      </div>
    </div>
    <mt-popup id="space_popup" v-model="spacePopup.show" :closeOnClickModal="false">
      <h5>添加空间</h5>
      <mt-field label="空间名称" placeholder="如无特殊需求,可直接填写总面积" v-model="spacePopup.spaceName" type="text"></mt-field>
      <mt-field label="空间面积" placeholder="空间对应的面积大小,如40m²" v-model="spacePopup.spaceArea" type="number"></mt-field>
      <div>
        <mt-button @click.native="spacePopup.show=false" type="default" size="small">取消</mt-button>
        <mt-button @click.native="updateRoomList" type="primary" size="small">确定</mt-button>
      </div>
    </mt-popup>
    <mt-button type="primary" size="large" @click="save">保存</mt-button>
    <mt-button type="default" size="large" @click="cancel">取消</mt-button>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui'
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
        spaceType: {
          value: this.$route.query.type
        },
        isOut: true,
        spaceTitle: '',
        phone: '',
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
        space: 'getSpace'
      }),
      showTypeName () {
        let name = '请选择'
        if (this.spaceType.value) {
          this.space.typeList.some(v => {
            if (v.storeAreaTypeKey === this.spaceType.value) {
              name = v.storeAreaTypeName
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
          console.log(this.spaceTypeTemp)
          this.spaceType = this.spaceTypeTemp
        }
        this.typePopup = false
      },
      editRoom (index) {
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
        if (!this.spacePopup.spaceArea.length || !this.spacePopup.spaceName.trim()) {
          MessageBox('提示', '请输入空间名称和空间大小')
          return false
        }
        this.spacePopup.show = false
        if (this.roomIndex > 0) {
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
        this.$store.dispatch('pushSpaceBase',{
          phone: this.phone,
          spaceTitle: this.spaceTitle,
          isOut: this.isOut,
          roomList: this.roomList,
          areaType: this.spaceType.value
        })
        this.$router.go(-1)
      },
      cancel () {
        this.$router.go(-1)
      },
      initPicker () {
        let slots = this.space.typeList.map((v) => {
          return {
            name: v.storeAreaTypeName,
            value: v.storeAreaTypeKey
          }
        })
        this.$refs.typePicker.setSlotValues(0, slots)
      }
    },
    created () {
    },
    mounted () {
      this.$store.dispatch('pushTypeList').then((res) => {
        this.initPicker()
      }, (err) => {
        console.log(err)
      })
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
            pointer-events: none;
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
