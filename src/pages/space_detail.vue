<template>
  <div id="space_detai">
    <aside class="noti" v-show="false">
      <span class="icon info"></span>
      <p>审核说明:照片不合格,请使用真实图片,场地被下架</p>
      <span class="icon close"></span>
    </aside>

    <div class="banner" :style="uploadFile.fileBase64?'background:url('+uploadFile.fileBase64+') no-repeat center center / cover;':''">
      <div class="upload_btn" v-show="!uploadFile.fileBase64">
        <img src="../assets/images/add_space.png" alt="">
        <p>哥~传个图吧~</p>
      </div>
      <input @change="fileChange" type="file" value="">
    </div>

    <mt-cell title="基本信息" :class="{unfinished: !baseStatus}" :value="baseStatus ? '已完成' : '未完成'" is-link @click.native="showBasePopup(1)"></mt-cell>
    <mt-cell title="地址配置" :class="{unfinished: !mapStatus}" :value="mapStatus ? '已完成' : '未完成'" is-link @click.native="showBasePopup(2)"></mt-cell>
    <mt-cell title="授课配置" :class="{unfinished: !baseStatus}" value="未完成" is-link @click.native="showBasePopup(3)"></mt-cell>

    <mt-cell title="开放时间" class="open_time" @click.native="timePopup=true" is-link></mt-cell>
    <mt-popup class="bottom_popup" v-model="timePopup" position="bottom" :closeOnClickModal="false" :modal="true">
      <div class="box">
        <span @click="closeTimePopup(0)">取消</span>
        <span @click="closeTimePopup(1)">确认</span>
      </div>
      <mt-picker ref="timePicker" :slots="slots" :visibleItemCount="5" @change="pickerchange" v-model="openTimeVal"></mt-picker>
    </mt-popup>

    <mt-cell title="场地状态" value="审核中"></mt-cell>
    <mt-field label="收费金额" placeholder="请输入" type="number"></mt-field>

    <div class="rule">
      <span class="select"></span>
      <p>我已阅读并同意<b>《场地入驻规则》</b></p>
    </div>

    <mt-button @click.native="publish" type="primary" size="large">发布</mt-button>
    <mt-button type="default" size="large">删除</mt-button>

  </div>
</template>
<script>
  import ajax from '../js/tools/ajax'
  import API from '../js/tools/api'
  import superAgent from 'superagent'
  import {mapGetters} from 'vuex'
  export default {
    name: 'spaceDetail',
    data () {
      return {
        id: this.$route.params.id,
        pickerValue: '',
        openTimeVal: '',
        openTime: {
          startTime: '',
          endTime: ''
        },
        timePopup: false,
        src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
        uploadFile: {
          file: undefined,
          fileBase64: '',
          qiniuSrc: 'http://omdweogbh.bkt.clouddn.com/201704211039261492742376614',
          token: '',
          key: ''
        },
        type: this.$route.query.type,
        params: {},
        headers: null,
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
        space: 'getSpace'
      }),
      baseStatus () {
        if (!Object.keys(this.space.spaceBase).length) return false
        let bool = true
        let spaceBase = this.space.spaceBase
        if (!spaceBase.areaType.trim() ||
          !spaceBase.phone.trim() ||
          !spaceBase.spaceTitle.trim() ||
          spaceBase.roomList.length === 0) {
          return false
        } else {
          return true
        }
      },
      mapStatus () {
        if (!Object.keys(this.space.mapCache).length) return false
        let mapCache = this.space.mapCache
        if (!mapCache.detail_addr.trim() ||
            Object.keys(mapCache.mapPos).length === 0 ||
            Object.keys(mapCache.prov_area).length === 0 ||
            !mapCache.prov_area_text.trim()
        ) {
          return false
        } else {
          return true
        }
      }
    },
    watch: {
    },
    methods: {
      showBasePopup (type) {
        switch (type) {
          case 1:
            this.$router.push({name: 'spaceDetailBase', query: {type: this.type}})
            break
          case 2 :this.$router.push({name: 'spaceDetailMap'})
            break
          case 3 :this.$router.push({name: 'spaceDetailClass'})
            break
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
          this.openTime.startTime = this.openTimeVal[0] + ':' + this.openTimeVal[1] + ':00'
          this.openTime.endTime = this.openTimeVal[2] + ':' + this.openTimeVal[3] + ':00'
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
              console.log(err)
            }
            console.log(res)
          })
        let fileReader = new FileReader()
        fileReader.onload = (e) => {
          this.uploadFile.fileBase64 = e.target.result
        }
        fileReader.readAsDataURL(this.uploadFile.file)
      },
      publish () {
        ajax(API.updateStoreArea, {
          id: this.id,
          coverPic: this.uploadFile.qiniuSrc, // 现在写死了
          officeBeginTime: this.openTime.startTime,
          officeEndTime: this.openTime.endTime,
          storeAreaBaseInfo: {
            storeName: '场地名称',
            telPhone: '18370097325',
            isOutdoors: 1,   //  是否户外（0：室内，1：室外）
            areaType: 'golfCourse',   // 第一步选择的
            addStoreSpaceReqs: [
              {
                spaceName: '总面积',
                spaceArea: 343.35
              }
            ]

          },
          addressInfo: {
            lat: 354.54,
            lng: 120.35,
            address: '具体地址信息',
            provinceId: 12596,
            city: 12597,
            storeArea: 1,   // 街道id
            cityName: '杭州市',
            countyId: 1,  // 区id
            countyName: '西湖区'
          },
          token: '8d26bb07f62257fd0858add630e397cb'
        }, (res) => {
          if (res.updateStoreArea.resultmessage === 'success') {
            this.$router.replace({
              name: 'space'
            })
          }
        })
      }
    },
    created () {
      if (!this.space.spaceDetail.length) {
        this.space.spaceDetail.id = this.id
      }
      ajax(API.getUploadToken, null, {
        methods: 'GET',
        succ: (res) => {
          this.uploadFile.token = res.uptoken
          this.uploadFile.key = res.sava_key
          this.uploadFile.qiniuSrc = 'http://omdweogbh.bkt.clouddn.com' + res.sava_key
        }
      })
    },
    beforeRouteLeave (to, from, next) {
      if (!/spaceDetail/.test(to.name)) {
        this.$store.dispatch('pushSpaceDetail', this.space.spaceDetail)
      }
      next()
    },
    mounted () {
      this.initPicker()
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
