<template>
  <div id="img_cut">
    <input type="file" @change="imgChange" value="">
    <div id="crop_mask" v-show="clipShow">
      <canvas id="canvas" v-finger:pinch="pinch" v-finger:multipoint-end="multipointEnd" v-finger:press-move="pressMove"></canvas>
      <div class="btns">
        <span @click="no">取消</span>
        <span @click="rotate">旋转</span>
        <span @click="yes">确定</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        file: null, // 文件对象
        imgObj: null, // DOM对象
        base64: '', // base64对象
        orient: 0, // 图片旋转角度
        clipShow: false, // 是否显示裁剪界面
        canvas: null,
        ctx: null,
        imgWidth: 0, // 源图片尺寸
        imgHeight: 0,
        winWidth: window.innerWidth, // 屏幕尺寸
        winHeight: window.innerHeight,
        originX: 0, // 屏幕中心坐标
        originY: 0,
        scale: 1, // 图片的缩放比例
        drawWidth: 0, // 图片画到canvas上面的尺寸
        drawHeight: 0,
        rectPos: {}, // 裁剪矩形坐标信息
        imgPos: {} // 图片坐标信息
      }
    },
    methods: {
      imgChange (e) {
        let me = this
        this.file = e.target.files[0]
        // 文件类型判断
        let reader = new FileReader()
        reader.readAsDataURL(this.file)
        reader.onload = (event) => {
          let img = new Image()
          img.src = event.target.result
          img.onload = function () {
            // 这里可能存在旋转的情况
            me.imgWidth = this.width
            me.imgHeight = this.height
            me.imgObj = this
            let canvas = document.createElement('canvas')
            let ctx = canvas.getContext('2d')
            canvas.width = this.width
            canvas.height = this.height
            ctx.drawImage(this, 0, 0, this.width, this.height)
            me.base64 = canvas.toDataURL('image/jpeg', 0.7)
            me.initCut()
          }
        }
      },
      initCut () {
        this.clipShow = true
        this.originX = this.winWidth / 2
        this.originY = this.winHeight / 2
        if (this.imgWidth < this.imgHeight) {
          this.drawWidth = this.winWidth
          this.scale = this.drawWidth / this.imgWidth
          this.drawHeight = this.scale * this.imgHeight
        } else if (this.imgWidth > this.imgHeight) {
          this.drawHeight = this.winWidth
          this.scale = this.drawHeight / this.imgHeight
          this.drawWidth = this.scale * this.imgWidth
        } else {
          this.drawWidth = this.drawHeight = this.imgWidth
          this.scale = 1
        }
        this.canvas = document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = this.winWidth
        this.canvas.height = this.winHeight
        this.drawImage()
        this.drawClipRect()
      },
      drawImage () {
        // 根据origin和偏移量来实时调整
        this.ctx.clearRect(0, 0, this.winWidth, this.winHeight)
        // this.ctx.drawImage(this.imgObj, 0, 0, 200, 200)
        this.ctx.drawImage(this.imgObj, this.originX - this.drawWidth / 2, this.originY - this.drawHeight / 2, this.drawWidth, this.drawHeight)
        this.imgPos = {
          x1: this.originX - this.drawWidth / 2,
          y1: this.originY - this.drawHeight / 2
        }
        this.imgPos.x2 = this.imgPos.x1 + this.drawWidth
        this.imgPos.y2 = this.imgPos.y1 + this.drawHeight
      },
      drawClipRect () { // 绘制裁剪区域
        this.ctx.fillStyle = '#fff'
        this.ctx.strokeStyle = '#fff'
        this.ctx.strokeRect(0, this.winHeight / 2 - this.winWidth / 2, this.winWidth, this.winWidth)
        this.rectPos = {
          x1: 0,
          y1: this.winHeight / 2 - this.winWidth / 2
        }
        this.rectPos.x2 = this.rectPos.x1 + this.winWidth
        this.rectPos.y2 = this.rectPos.y1 + this.winWidth
      },
      isBeyond () {
        // 注: x1y1代表左上角 x2y2代表右下角坐标
        if (this.rectPos.x1 - this.imgPos.x1 >= 0 && this.rectPos.y1 - this.imgPos.y1 >= 0 && this.rectPos.x2 - this.imgPos.x2 <= 0 && this.rectPos.y2 - this.imgPos.y2 <= 0) {
          return true
        } else {
          return false
        }
      },
      pinch (evt) {
        let scale = this.scale * evt.scale
        this.drawWidth = this.imgWidth * scale
        this.drawHeight = this.imgHeight * scale
        this.drawImage()
        this.drawClipRect()
      },
      pressMove (evt) {
        this.originX = this.originX + evt.deltaX
        this.originY = this.originY + evt.deltaY
        this.drawImage()
        this.drawClipRect()
      },
      multipointEnd (evt) {
        if (!this.isBeyond()) {
          this.initCut()
          return false
        }
        this.scale = this.drawWidth / this.imgWidth
      },
      getClipPos () { // 获取最终裁剪坐标
        return {
          x: ~~(this.winWidth / this.scale),
          y: ~~(this.winWidth / this.scale),
          offsetX: ~~((this.rectPos.x1 - this.imgPos.x1) / this.scale),
          offsetY: ~~((this.rectPos.y1 - this.imgPos.y1) / this.scale)
        }
      },
      rotate () {
        let me = this
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        canvas.width = this.imgObj.height // 因为canvas重置宽高会刷新画板,所以预先手动转换宽高
        canvas.height = this.imgObj.width
        ctx.translate(this.imgObj.height, 0) // 将canvas的画布点转移到右上角
        ctx.rotate(90 * Math.PI / 180)
        ctx.drawImage(this.imgObj, 0, 0, this.imgObj.width, this.imgObj.height)
        let img = new Image()
        this.base64 = img.src = canvas.toDataURL('image/jpeg', 0.7)
        img.onload = function () {
          me.imgObj = this
          me.imgWidth = this.width
          me.imgHeight = this.height
          me.initCut()
        }
      },
      yes () {
        let clipPos = this.getClipPos()
        this.clipShow = false
        this.$emit('submit', clipPos, this.base64)
      },
      no () {
        this.clipShow = false
        this.file = null
        this.imgObj = null
        this.base64 = ''
      }
    },
    created () {
    }
  }
</script>
<style lang="scss">
  @import '../css/public';
  // 简单的样式 自己在父组件中修改为宜
  #img_cut{
    width:100%;
    height:100%;
    >input{
      width:100%;
      height:100%;
      opacity:0;
    }
  }
  #crop_mask{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:#000;
    z-index:3;
    canvas{
      position:absolute;
      width:100%;
      height:100%;
    }
    .btns{
      width:100%;
      position:absolute;
      bottom:0;
      left:0;
      >span{
        color:#fff;
      }
    }
  }
</style>
