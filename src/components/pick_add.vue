<template>
  <iframe id="frame_container" src="https://m.amap.com/picker/?center=116.3972,39.9696&key=608d75903d29ad471362f8c58c550daf"></iframe>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      msgCallBack (e) {
        alert('您选择了:' + e.data.name + ',' + e.data.location)
      }
    },
    mounted () {
      console.log(document.getElementById('frame_container'))
      let iframe = document.getElementById('frame_container').contentWindow
      document.getElementById('frame_container').onload = function () {
        iframe.postMessage('hello','https://m.amap.com/picker/')
      }
      window.addEventListener('message', this.msgCallBack)
    },
    destroyed () {
      window.removeEventListener('message', this.msgCallBack)
    }
  }
</script>
<style lang="scss">
  #frame_container{
    width:100%;
    height:100%;
    .picker-index{
      height:100px;
    }
  }
</style>