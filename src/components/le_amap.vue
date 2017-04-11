<template>
  <div id="map_container" class="map_container">
    
  </div>
</template>
<script>
  export default {
    name: 'le-amap',
    props: {
      address: String
    },
    data () {
      return {
        map: null,
        zoom: 11,
        center: [116.39, 39.9],
        marker: null,
        events: {
          onComplete: null,
          onError: null
        },
        geolocation: null
      }
    },
    watch: {
      address (v) {
        console.log(v)
        // this.updateAdd(v)
      }
    },
    methods: {
      updateAdd (v) {
        this.map.setCity(v)
      }
    },
    mounted () {
      this.map = new AMap.Map('map_container', {
        center: [117.000923, 36.675807],
        zoom: 18,
        draggable: true,
        raiseOnDrag: true
      })
      this.marker = new AMap.Marker({
        icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png'
        // content: 'marker'
      })
      // this.marker.setAnimation('AMAP_ANIMATION_BOUNCE')
      this.map.plugin('AMap.Geolocation', () => {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          buttonPosition: 'RB',
          showMarker: true,
          panToLocation: true,
          showCircle: false,
          noGeoLocation: 3 // 0: 可以使用浏览器定位 1: 手机设备禁止使用浏览器定位 2: PC上禁止使用浏览器定位 3: 所有终端禁止使用浏览器定位
        })
        this.map.addControl(geolocation)
        geolocation.getCurrentPosition((status, result) => {
          if (status === 'complete') {
            this.geolocation = result
            this.marker.position = [this.geolocation.position.lng, this.geolocation.position.lat]
            console.log(this.marker.position)
            setTimeout(() => {
              this.marker.setMap(this.map)
            }, 0)
          }
        })
        AMap.event.addListener(geolocation, 'complete', this.events.onComplete) // 返回定位信息
        AMap.event.addListener(geolocation, 'error', this.events.onError) // 返回定位出错信息
      })
    }
  }
</script>
<style lang="scss">
  .map_container{
    width:100%;
    height:100%;
  }
</style>