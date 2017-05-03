<template>
  <div id="img_cut">
    <input type="file" @change="imgChange" value="">
    <div id="mask" v-show="canvasShow">
      <canvas id="canvas" v-finger:pinch="pinch" v-finger:multipoint-end="multipointEnd" v-finger:press-move="pressMove"></canvas>
      <div class="btns">
        <button>取消</button>
        <button @click="yes">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        imgObj: null, // 文件对象
        base64: '', // base64对象
        canvasShow: false, // 是否显示裁剪界面
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
        let file = e.target.files[0]
        // 文件类型判断
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (event) => {
          let img = new Image()
          this.base64 = img.src = event.target.result
          img.onload = function () {
            // 这里可能存在旋转的情况
            me.imgWidth = this.width
            me.imgHeight = this.height
            me.imgObj = this
            me.initCut()
          }
        }
      },
      initCut () {
        this.canvasShow = true
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
        console.log(this.imgPos)
        console.log(this.rectPos)
      },
      pinch (evt) {
        let scale = this.scale * evt.scale
        this.drawWidth = this.imgWidth * scale
        this.drawHeight = this.imgHeight * scale
        this.isBeyond()
        // if (this.isBeyond()) {
        //   this.scale =
        // }
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
        this.scale = this.drawWidth / this.imgWidth
        this.getClipPos()
      },
      getClipPos () { // 获取最终裁剪坐标
        let x = this.winWidth / this.scale
        let y = x
        let offsetX = (this.rectPos.x1 - this.imgPos.x1) / this.scale
        let offsetY = (this.rectPos.y1 - this.imgPos.y1) / this.scale
        console.log(x, y, offsetX, offsetY)
      },
      yes () {
      },
      upload (data) {
        // 七牛的表单上传只能使用file类型文件
      }
    },
    created () {
    }
  }
</script>
<style lang="scss" scoped>
  @import '../css/public';
  #img_cut{
    width:100%;
    height:100%;
    >input{
      width:100%;
      height:100%;
      opacity:0;
    }
  }
  #mask{
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
      height:80px;
      position:absolute;
      bottom:0;
      left:0;
    }
  }
</style>