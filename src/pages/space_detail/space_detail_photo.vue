<template>
  <div id="space_photo">
    <div id="photo_wrap">
      <section class="upload_box head">
        <div class="priview">
          <transition name="fade"><img v-show="photoUrl.coverPic" v-lefit-load="{url:photoUrl.coverPic, scale: 0.4}" alt=""></transition>
          <transition name="fade"><i v-show="!photoUrl.coverPic" class="icon"></i></transition>
          <input ref="coverPic" type="file" @change="callImgCutComponent('coverPic', $event)"></div>
        <p>门店图</p>
      </section>
      <div class="upload_group">
        <section class="upload_box">
          <div class="priview">
            <transition name="fade"><img v-show="photoUrl.env1" v-lefit-load="photoUrl.env1" alt=""></transition>
            <transition name="fade"><i v-show="!photoUrl.env1" class="icon"></i></transition>
            <input ref="env1" type="file" @change="callImgCutComponent('env1', $event)"></div>
          <p>环境图1</p>
        </section>
        <section class="upload_box">
          <div class="priview">
            <transition name="fade"><img v-show="photoUrl.env2" v-lefit-load="photoUrl.env2" alt=""></transition>
            <transition name="fade"><i v-show="!photoUrl.env2" class="icon"></i></transition>
            <input ref="env2" type="file" @change="callImgCutComponent('env2', $event)"></div>
          <p>环境图2</p>
        </section>
        <section class="upload_box">
          <div class="priview">
            <transition name="fade"><img v-show="photoUrl.licensePic" v-lefit-load="photoUrl.licensePic" alt=""></transition>
            <transition name="fade"><i v-show="!photoUrl.licensePic" class="icon"></i></transition>
            <input ref="licensePic" type="file" @change="callImgCutComponent('licensePic', $event)"></div>
          <p>营业执照(选填)</p>
        </section>
      </div>
    </div>
    <mt-button type="primary" size="large" @click.native="save">保存</mt-button>
    <h6 id="photo_stand" @click="popupVisible=true">查看图片标准</h6>
    <photo-guide :show="popupVisible" @close="popupVisible=false"></photo-guide>
    <le-img-cut-upload :output="2" ref="imgCutComponent" @submit="imgCutFinish"></le-img-cut-upload>
  </div>
</template>
<script>
  import superAgent from 'superagent'
  import { mapGetters } from 'vuex'
  import PhotoGuide from './photo_guide'
  import LeImgCutUpload from '../../js/plugins/img-cut-upload'
  export default {
    components: {
      PhotoGuide,
      LeImgCutUpload
    },
    data () {
      return {
        popupVisible: true,
        currentCutImg: '',
        uploadFile: {},
        photoUrl: {
          coverPic: '',
          env1: '',
          env2: '',
          licensePic: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        spaceDetail: 'getSpaceDetail'
      })
    },
    methods: {
      callImgCutComponent (currentCutImg, evt) {
        this.currentCutImg = currentCutImg
        this.$refs.imgCutComponent.imgChange(evt)
      },
      imgCutFinish (data, pos) {
        this.$refs[this.currentCutImg].value = ''
        this.uploadQiniu(data).then(res => {
          let url = `https://cdn.leoao.com/${res.body.key}`
          this.photoUrl[this.currentCutImg] = url
          this.$store.dispatch('loadingFalse')
        })
        .catch(err => {
          this.$store.dispatch('loadingFalse')
          this.$MsgBox({msg: err.resultmessage})
        })
      },
      uploadQiniu (file) { // 七牛上传方法
        this.$store.dispatch('loadingTrue')
        let formData = new FormData()
        formData.append('file', file)
        formData.append('token', this.uploadFile.token)
        formData.append('key', this.uploadFile.key + new Date().getTime())
        return new Promise((resolve, reject) => {
          superAgent.post(`http://upload.qiniu.com/`)
            .send(formData)
            .end((err, res) => {
              if (err) {
                reject(err)
              }
              resolve(res)
            })
        })
      },
      save () {
        this.$ajax(this.$API.updateStoreArea, {
          id: this.$route.params.id,
          coverPic: this.photoUrl.coverPic,
          licensePic: this.photoUrl.licensePic,
          environmentPic: [this.photoUrl.env1, this.photoUrl.env2]
        }, () => {
          this.$MsgBox({
            msg: '保存成功!',
            yes: () => {
              this.$router.go(-1)
            }})
        }, () => {
          this.$MsgBox({msg: '照片上传失败,请重新上传'})
        })
      },
      getQiniuToken () {
        this.$ajax(this.$API.getUploadToken, null, {
          methods: 'GET',
          succ: data => {
            this.uploadFile.token = data.uptoken
            this.uploadFile.key = data.sava_key
          },
          err: err => {
            this.$MsgBox({msg: err.code + ':服务器跑步去了'})
          },
          fail: fail => {
            this.$MsgBox({msg: '服务器跑步去了'})
          }
        })
      },
      detailPhotoDeal (data) {
        this.photoUrl = {
          coverPic: data.coverPic,
          env1: data.environmentPic[0],
          env2: data.environmentPic[1],
          licensePic: data.licensePic
        }
      }
    },
    created () {
      this.getQiniuToken()
      if (Object.keys(this.spaceDetail).length > 0) {
        this.detailPhotoDeal(this.spaceDetail)
      }
      this.$store.dispatch('pushSpaceDetail', {id: this.$route.params.id, reload: false}).then(res => {
        this.detailPhotoDeal(res)
      })
    }
  }
</script>
<style lang="scss">
  @import '../../css/public';
  #photo_wrap{
    padding: torem(30px) torem(50px);
  }
  .upload_box{
    .priview{
      width:torem(650px);
      height:torem(650px);
      margin:0 auto;
      background:#e9e9e9 none no-repeat center center / 100% 100%;
      transition:all .3s ease;
      position:relative;
      > img {
        width:100%;
        height:100%;
        position:absolute;
        z-index:2;
      }
      .icon{
        display:block;
        width:100%;
        height:100%;
        background:#e9e9e9 url('../../assets/images/add_space_photo.png') no-repeat center center / torem(44px) torem(44px);
      }
      >input{
        display:block;
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        opacity:0;
        z-index:3;
      }
    }
    &.head .priview{
      .icon{
        background-size:torem(140px) torem(140px);
      }
    }
    >p{
      text-align:center;
      margin-top:torem(20px);
      font-size:torem(30px);
      color:#000;
      font-weight:bold;
    }
  }
  .upload_group{
    margin-top:torem(30px);
    display:flex;
    justify-content:space-between;
    .upload_box {
      .priview{
        width:torem(180px);
        height:torem(180px);
      }
      >p {
        font-size:torem(26px);
        color:rgba(0,0,0,.6);
        font-weight:normal;
      }
    }
  }
  .img_cut_upload {
    input {
      display:none;
    }
    .btns span{
      font-size:torem(32px);
      padding:torem(20px) torem(30px);
    }
  }
  #photo_stand{
    text-align:center;
    color:$main-color;
    font-size:torem(28px);
    margin-top:torem(20px);
  }
  #space_photo .mint-button{
    margin:0 auto;
    width:torem(690px);
  }
</style>