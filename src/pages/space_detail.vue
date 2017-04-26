<template>
  <div id="space_detai">
    <aside class="noti" v-show="false">
      <span class="icon info"></span>
      <p>审核说明:照片不合格,请使用真实图片,场地被下架</p>
      <span class="icon close"></span>
    </aside>

    <div class="banner" :style="'background:url('+uploadImgSrc+') no-repeat center center / cover;'">
      <div class="upload_btn" v-show="!uploadImgSrc">
        <img src="../assets/images/add_space.png" alt="">
        <p>哥~传个图吧~</p>
      </div>
      <input @change="fileChange" type="file" value="">
    </div>

    <mt-cell title="基本信息" :class="{unfinished: !baseStatus}" :value="baseStatus ? '已完成' : '未完成'" is-link @click.native="showBasePopup(1)"></mt-cell>
    <mt-cell title="地址配置" :class="{unfinished: !mapStatus}" :value="mapStatus ? '已完成' : '未完成'" is-link @click.native="showBasePopup(2)"></mt-cell>
    <mt-cell title="授课配置" :class="{unfinished: !classStatus}" :value="classStatus ? '已完成' : '未完成'" is-link @click.native="showBasePopup(3)"></mt-cell>

    <mt-cell title="开放时间" class="open_time" @click.native="timePopup=true" :value="openTimeText" is-link></mt-cell>
    <mt-popup class="bottom_popup" v-model="timePopup" position="bottom" :closeOnClickModal="false" :modal="true">
      <div class="box">
        <span @click="closeTimePopup(0)">取消</span>
        <span @click="closeTimePopup(1)">确认</span>
      </div>
      <mt-picker ref="timePicker" :slots="slots" :visibleItemCount="5" @change="pickerchange" v-model="openTimeVal"></mt-picker>
    </mt-popup>

    <mt-cell title="场地状态" :value="statusText" is-link @click.native="changeStatus"></mt-cell>
    <mt-actionsheet :actions="actions" v-model="sheetVisible" :closeOnclickModal="false" :canvelText="'取消'">
    </mt-actionsheet>
    <mt-cell title="收费金额" value="说明文字"></mt-cell>

    <div class="rule">
      <span class="select"></span>
      <p>我已阅读并同意<b>《场地入驻规则》</b></p>
    </div>

    <mt-button @click.native="publish" type="primary" size="large">发布</mt-button>
    <mt-button @click.native="deleteSpace" type="default" size="large">删除</mt-button>

  </div>
</template>
<script>
  import ajax from '../js/tools/ajax'
  import API from '../js/tools/api'
  import superAgent from 'superagent'
  import {mapGetters} from 'vuex'
  import { MessageBox } from 'mint-ui'
  export default {
    name: 'spaceDetail',
    data () {
      return {
        id: this.$route.params.id,
        isMonted: false,
        openTimeVal: [],
        openTime: {
          officeBeginTime: '',
          officeEndTime: ''
        },
        timePopup: false,
        src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
        uploadFile: {
          file: undefined,
          fileBase64: '',
          qiniuSrc: '',
          token: '',
          key: ''
        },
        type: this.$route.query.type,
        params: {},
        sheetVisible: false,
        actions: [
          {
            name: '营业中',
            method: (v) => {
              this.isService = 1
            }
          },
          {
            name: '停业中',
            method: () => {
              this.isService = 0
            }
          }
        ],
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
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
            values: [],
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
            values: [],
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
            values: [],
            className: 'slot3',
            textAlign: 'center',
            defaultIndex: 0
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        space: 'getSpace',
        token: 'getUserToken'
      }),
      uploadImgSrc () {
        if (this.space.spaceDetail.coverPic) {
          return this.space.spaceDetail.coverPic
        } else if (this.uploadFile.qiniuSrc) {
          return this.uploadFile.qiniuSrc
        } else {
          return ''
        }
      },
      baseStatus () {
        if (this.space.spaceDetail.storeAreaBaseInfoResp) {
          return this.space.spaceDetail.storeAreaBaseInfoResp.storeAreaBaseInfoStatus
        } else {
          return false
        }
      },
      mapStatus () {
        if (this.space.spaceDetail.addressInfo) {
          return this.space.spaceDetail.addressInfo.addressInfoStatus
        } else {
          return false
        }
      },
      classStatus () {
        if (this.space.spaceDetail.classSetResp) {
          return this.space.spaceDetail.classSetResp.classStatus
        } else {
          return false
        }
      },
      statusText () {
        switch (this.space.spaceDetail.status) {
          case 1: return '编辑中'
          case 2: return '审核中'
          case 3: return '审核失败'
          case 4: return '已下架'
          case 5: return '营业中'
          case 6: return '停业'
        }
      },
      openTimeText () {
        if (this.openTimeVal.join('') !== '00000000' && !this.openTimeVal.some(v => v === undefined)) {
          return this.openTimeVal[0] + ':' + this.openTimeVal[1] + ' - ' + this.openTimeVal[2] + ':' + this.openTimeVal[3]
        }
      }
    },
    watch: {
      status: function (v) {
        ajax(API.updateStoreArea, {
          token: this.token,
          isService: this.isService
        })
      },
      '$route': function (v) {
        if (v.name === 'spaceDetail' && this.isMonted) {
          this.openTimeText = ''
          this.openTime = {
            officeBeginTime: '',
            officeEndTime: ''
          }
          this.$refs.timePicker.setValues([0, 0, 0, 0])
          // 清空之前的
          this.updateDetail()
        }
      }
    },
    methods: {
      showBasePopup (type) {
        switch (type) {
          case 1:
            this.$router.push({name: 'spaceDetailBase', query: {type: this.type}})
            break
          case 2 :this.$router.push({name: 'spaceDetailMap'})
            break
          case 3 :this.$router.push({name: 'spaceDetailClass', query: {type: this.type}})
            break
        }
      },
      changeStatus () {
        if (this.space.spaceDetail.status > 3) {
          sheetVisible = true
        }
      },
      initPicker () {
        let hArr = []
        let mArr = []
        for (let i = 0; i < 24; i++) {
          hArr.push('' + (i > 9 ? i : '0' + i))
        }
        for (let i = 0; i < 60; i++) {
          mArr.push('' + (i > 9 ? i : '0' + i))
        }
        this.$refs.timePicker.setSlotValues(0, hArr)
        this.$refs.timePicker.setSlotValues(2, hArr)
        this.$refs.timePicker.setSlotValues(1, mArr)
        this.$refs.timePicker.setSlotValues(3, mArr)
      },
      closeTimePopup (n) {
        // n = 0 取消 n=1 确认
        // 后面再加时间判断
        if (n) {
          console.log(this.openTimeVal)
          this.openTime.officeBeginTime = this.openTimeVal[0] + ':' + this.openTimeVal[1] + ':00'
          this.openTime.officeEndTime = this.openTimeVal[2] + ':' + this.openTimeVal[3] + ':00'
          ajax(API.updateStoreArea, {
            id: this.$route.params.id,
            officeBeginTime: this.openTime.officeBeginTime,
            officeEndTime: this.openTime.officeEndTime,
            token: this.token
          })
        } else {
          this.openTimeText = ''
        }
        this.timePopup = false
      },
      pickerchange (vm, val) {
        this.openTimeVal = val
      },
      fileChange (e) {
        this.uploadFile.file = e.target.files[0]
        let formData = new FormData()
        formData.append('file', this.uploadFile.file)
        formData.append('token', this.uploadFile.token)
        formData.append('key', this.uploadFile.key + new Date().getTime())
        superAgent.post('http://upload.qiniu.com/')
          .send(formData)
          .end((err, res) => {
            if (err) {
              MessageBox('提示', err.resultmessage)
            }
            this.uploadFile.qiniuSrc = '//cdn.leoao.com/' + res.body.key
            ajax(API.updateStoreArea, {
              id: this.$route.params.id,
              coverPic: this.uploadFile.qiniuSrc,
              token: this.token
            })
          })
        let fileReader = new FileReader()
        fileReader.onload = (e) => {
          this.uploadFile.fileBase64 = e.target.result
        }
        fileReader.readAsDataURL(this.uploadFile.file)
      },
      publish () {
        if (!this.baseStatus || !this.mapStatus) {
          MessageBox('提示', '未填写完成')
          return false
        }
        let spaceBase = this.space.spaceBase
        let mapCache = this.space.mapCache
        ajax(API.updateStoreArea, {
          id: this.$route.params.id,
          coverPic: this.uploadFile.qiniuSrc, // 现在写死了
          officeBeginTime: this.openTime.startTime,
          officeEndTime: this.openTime.endTime,
          token: this.token
        }, (res) => {
          if (res.resultmessage === 'success') {
            this.$router.replace({
              name: 'space'
            })
          }
        })
      },
      deleteSpace () {
        MessageBox.confirm('确定执行此操作?').then(({value, action}) => {
          ajax(API.deleteStoreArea, {id: this.$route.params.id, token: this.token}, res => {
            this.$router.push({
              name: 'space'
            }, err => {
              console.log(err)
            })
          })
        })
      },
      updateDetail () {
        if (!this.$route.params.type) {
          this.$store.dispatch('pushSpaceDetail', {id: this.$route.params.id * 1, reload: true}).then(res => {
            this.initPicker()
            if (res.officeBeginTime && res.officeEndTime) {
              let timeVal = (res.officeBeginTime + res.officeEndTime).replace(/(\d{2}:\d{2}:)00/g,'$1').split(':').splice(0,4)
              this.$refs.timePicker.setValues(timeVal)
            }
          })
        }
      }
    },
    created () {
      ajax(API.getUploadToken, null, {
        methods: 'GET',
        succ: (res) => {
          this.uploadFile.token = res.uptoken
          this.uploadFile.key = res.sava_key
        }
      })
    },
    mounted () {
      this.isMonted = true
      this.updateDetail()
    },
    components: {
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
    input[type=file]{
      width:100%;
      height:100%;
      position:absolute;
      top:0;
      left:0;
      opacity:0;
    }
    .upload_btn{
      position:absolute;
      left:50%;
      top:50%;
      margin-left:torem(-75px);
      margin-top:torem(-75px);
      >img {
        width:torem(150px);
        height:torem(150px);
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
    box-sizing:border-box;
    width:torem(690px);
    margin:0 auto torem(20px);
    &:last-of-type{
      margin-bottom:torem(60px);
    }
  }
  #upload_component{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
  }
</style>
