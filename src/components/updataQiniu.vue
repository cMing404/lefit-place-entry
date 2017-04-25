<template>
  <div class="updata-qiniu">
    <div class="add-img" :id="browse_button">
      <spinner class="updata-loading" v-show="updataLoading" type="ripple"></spinner>
      <span v-show="!updataLoading">+</span>
    </div>
  </div>
</template>
<script>
import {
  Spinner
} from 'vux'
import Qiniu from 'Qiniu'
export default {
  components: {
    Spinner
  },
  data () {
    return {
      updataLoading: false,
      sourceLink: '',
      browse_button: `qiniu-${new Date().getTime()}-${Math.ceil(Math.random() * Math.pow(10, 10))}` // 防止按钮id相同
    }
  },
  methods: {
    upDataQiniu () {
      let self = this
      let uploaderOption = {
        runtimes: 'html5,html4',                // 上传模式，依次退化
        browse_button: this.browse_button,      // 上传选择的点选按钮，必需
        uptoken_url: '/wap/get_qiniu_uptoken',  // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
        get_new_uptoken: false,                 // 设置上传文件的时候是否每次都重新获取新的uptoken
        unique_names: true,
        domain: 'cdn.leoao.com',                // bucket域名，下载资源时用到，必需
        max_file_size: '10mb',                  // 最大文件体积限制
        max_retries: 3,                         // 上传失败最大重试次数
        dragdrop: false,                        // 开启可拖曳上传
        chunk_size: '4mb',                      // 分块上传时，每块的体积
        auto_start: true,                       // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
          'BeforeUpload': (up, file) => {
            self.updataLoading = true
          },
          'FileUploaded': (up, file, info) => {
            self.updataLoading = false
            const res = JSON.parse(info)
            const sourceLink = `${res.data.full_url}?imageslim`
            self.sourceLink = sourceLink
            self.$emit('input', self.sourceLink)
          },
          'Error': (up, err, errTip) => {
            self.updataLoading = false
            console.log('上传失败')
          }
        }
      }
      Qiniu.uploader(uploaderOption)
    },
    fileUploaded () {
      this.$emit('input', this.sourceLink)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.upDataQiniu()
    })
  }
}
</script>
<style lang="less" scoped>
.updata-qiniu {
  .add-img {
    background-color: #eaeaea;
    min-height: 100px;
    line-height: 100px;
    font-size: 50px;
    color: #d9d9d9;
  }
}
.updata-loading{
  display: inline;
}
</style>
