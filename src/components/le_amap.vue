<template>
  <div id="map_container" class="map_container">
    <i id="marker_center"></i>
  </div>
</template>
<script>
  export default {
    name: 'le-amap',
    props: {
      prov_area: String,
      detail_add: String
    },
    data () {
      return {
        map: null,
        placeSearch: null, // 搜索插件
        zoom: 11,
        center: [116.39, 39.9],
        marker: null,
        events: {
          onComplete: null,
          onError: null
        },
        geolocation: null,
        geoCoder: null,
        mapPos: {
          local: null,
          selected: null
        }
      }
    },
    watch: {
      'prov_area': 'update_prov_area',
      'detail_add': 'update_detail_add'
    },
    methods: {
      update_prov_area (v) {
        console.log(v)
        let str = v.trim().replace(/\S+\s(\S+)\s\S+/, '$1')
        console.log(str)
        str && this.map.setCity(str)
        this.placeSearch.setCity(str)
        this.geoCoder = new AMap.Geocoder({
          city: str,
          radius: 1000
        })
      },
      update_detail_add (v) {
        // this.placeSearch.search(v, function (status, result) {
        //   if (status === 'complete') {
        //     result.poiList.pois = []
        //   }
        // })
        this.geoCoder.getLocation(v, (status, result) => {
          if (status === 'complete') {
            let pos = result.geocodes[0].location
            this.map.setZoomAndCenter(14, [pos.lng, pos.lat])
          }
        })
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
          noGeoLocation: 3 // 0: 可以使用浏览器定位 1: 手机设备禁止使用浏览器定位 2: PC上禁止使用浏览器定位 3: 所有终端禁止使用浏览器定位
        })
        this.map.addControl(geolocation)
        geolocation.getCurrentPosition((status, result) => {
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
      AMap.event.addListener(this.map, 'moveend', () => {
        let pos = this.map.getCenter()
        this.mapPos.selected = [pos.lng, pos.lat]
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
  }
</style>