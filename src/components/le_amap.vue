<template>
  <div id="map_container" class="map_container">
    <div id="marker_center">
      <div class="info" v-show="centerInfoShow && prov_area">
        <p>{{centerInfo}}</p>
        <button @click="submit">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'le-amap',
    props: {
      prov_area: String,
      detail_addr: String,
      posShow: Array
    },
    data () {
      return {
        map: null,
        placeSearch: null, // 搜索插件
        zoom: 11,
        center: [116.39, 39.9],
        marker: null,
        geolocationLoaded: false,
        geocoderLoaded: false,
        events: {
          onComplete: null,
          onError: null
        },
        geolocation: null,
        geoCoder: null,
        centerInfo: '',
        centerInfoShow: false,
        isPosShow: false,
        mapPos: {}
      }
    },
    watch: {
      'prov_area': 'update_prov_area',
      'detail_addr': 'update_detail_addr',
      'posShow': 'update_posShow'
    },
    methods: {
      update_prov_area (v) {
        console.log(this.posShow.length)
        if (this.posShow.length && this.isPosShow) {
          let str = v.trim().replace(/\S+\s(\S+)\s\S+/, '$1')
          str && this.map.setCity(str)
          this.placeSearch.setCity(str)
          this.geoCoder = new AMap.Geocoder({
            city: str,
            radius: 1000
          })
        }
      },
      update_detail_addr (v) {
        if (this.posShow.length && this.isPosShow) {
          this.geoCoder.getLocation(v, (status, result) => {
            if (status === 'complete') {
              let pos = result.geocodes[0].location
              this.map.setZoomAndCenter(14, [pos.lng, pos.lat])
            }
          })
        }
      },
      update_posShow (v) {
        if (v[0] !== undefined) {
          setTimeout(() => {
            this.map.setZoomAndCenter(14, v)
            this.isPosShow = true
          }, 1000)
        } else {
          this.isPosShow = true
        }
      },
      submit () {
        this.$emit('submit', this.mapPos)
      }
    },
    created () {
      console.log(this.mapPos)
    },
    mounted () {
      // if (this.mapPos) {
      //   this.centerInfoShow = true
      //   this.centerInfo = this.mapPos.selectedAddr
      // }
      this.map = new AMap.Map('map_container', {
        center: [116.397428, 39.90923],
        zoom: 15,
        draggable: true,
        raiseOnDrag: true
      })
      this.marker = new AMap.Marker({
        // icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        // icon: 'https://cdn.leoao.com/pos_icon.png',
        showBuildingBlock: true,
        mapStyle: 'dark'
      })
      AMap.service('AMap.PlaceSearch', () => {
        this.placeSearch = new AMap.PlaceSearch({
          map: this.map,
          citylimit: true
        })
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
          showButton: true,
          noGeoLocation: 3 // 0: 可以使用浏览器定位 1: 手机设备禁止使用浏览器定位 2: PC上禁止使用浏览器定位 3: 所有终端禁止使用浏览器定位
        })
        this.map.addControl(geolocation)
        geolocation.getCurrentPosition((status, result) => {
          this.geolocationLoaded = true
          if (status === 'complete') {
            this.geolocation = result
            this.mapPos.local = this.marker.position = [this.geolocation.position.lng, this.geolocation.position.lat]
            // setTimeout(() => {
              // 定位后暂时不显示marker图标
              // this.marker.setMap(this.map)
            // }, 0)
          }
        })
        AMap.event.addListener(geolocation, 'complete', this.events.onComplete) // 返回定位信息
        AMap.event.addListener(geolocation, 'error', this.events.onError) // 返回定位出错信息
      })
      this.map.plugin(['AMap.ToolBar'], () => {
        let tool = new AMap.ToolBar({
          position: 'LB'
        })
        this.map.addControl(tool)
      })
      AMap.event.addListener(this.map, 'touchmove', () => {
        this.centerInfoShow = false
      })
      AMap.event.addListener(this.map, 'zoomstart', () => {
        this.centerInfoShow = false
      })
      AMap.event.addListener(this.map, 'zoomend', () => {
        this.centerInfoShow = true
      })
      this.map.plugin(['AMap.Geocoder'], () => {
        let geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: 'all'
        })
        this.geocoderLoaded = true
        AMap.event.addListener(this.map, 'moveend', () => {
          let pos = this.map.getCenter()
          this.mapPos.selected = [pos.lng, pos.lat]
          geocoder.getAddress(this.mapPos.selected, (status, result) => {
            if (status === 'complete') {
              this.centerInfoShow = true
              this.centerInfo = result.regeocode.formattedAddress.replace(/^\S+?区/,'')
              this.mapPos.selectedAddr = this.centerInfo
            }
          })
        })
      })
    }
  }
</script>
<style lang="scss">
  @import '../css/public';
  .map_container{
    width:100%;
    height:100%;
  }
  #marker_center {
    width:torem(48px);
    height:torem(62px);
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    display:block;
    z-index:2;
    background:url(../assets/images/pos_icon.png) no-repeat center center / 100% 100%;
    >.info {
      position:absolute;
      top:0;
      left:50%;
      background:#fff;
      transform:translate(-50%, -120%);
      display:flex;
      align-items:center;
      padding:torem(14px) torem(24px);
      font-size:torem(28px);
      color:rgba(#000,.6);
      box-shadow: 1px 1px 1px 1px #ddd;
      &:after{
        content:'';
        display:block;
        width:0;
        height:0;
        border:5px solid transparent;
        border-top-color:#fff;
        position:absolute;
        bottom:-10px;
        left:50%;
        transform:translateX(-50%);
      }
      >p{
        max-width:torem(320px);
        min-width:torem(280px);
      }
      >button{
        width:torem(110px);
        height:torem(64px);
        line-height:torem(64px);
        background:$main-color;
        color:#fff;
        border:none;
        border-radius:torem(5px);
        font-size:torem(26px);
        outline:none;
        text-align:center;
      }
    }
  }
</style>
