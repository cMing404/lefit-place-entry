<template>
  <div id="space_map">
    <mt-field placeholder="省、市、区"></mt-field>
    <mt-field placeholder="详细地址"></mt-field>

     <div class="amap-page-container">
        <el-amap :vid="'amap-vue'" :center="center" :zoom="zoom" :map-manager="amapManager" :plugin="plugin" :events="events" :scrollWheel="false" :keyboardEnable="false">
          <!--marker点坐标-->
          <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
        </el-amap>
        <button v-on:click="getMap">get map</button>
        <button type="button" name="button" v-on:click="addZoom">zoom++</button>
        <button type="button" name="button" v-on:click="subZoom">zoom--</button>
        <button type="button" name="button" v-on:click="changeCenter">change center</button>
      </div>

  </div>
</template>
<script>
  import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap'
  let amapManager = new AMapManager()
  export default {
    data () {
      let me = this
      return {
        map: null,
        vid: 'amap-vue-1',
        zoom: 12,
        center: [116.478241, 39.999802],
        events: {
          'moveend': () => {
            let mapCenter = this.amapManager.getMap().getCenter()
            this.center = [mapCenter.getLng(), mapCenter.getLat()]
            console.log(this.center)
          },
          'zoomchange': () => {
            this.zoom = this.amapManager.getMap().getZoom()
          },
          'click': (e) => {
            console.log('map clicked')
          }
        },
        plugin: ['Scale', 'ToolBar', {
          pName: 'Geolocation',
          events: {
            init (instance) {
              instance.getCurrentPosition((status, result) => {
                console.log(me)
              })
            }
          }
        }],
        amapManager: amapManager,
        markers: [
          {
            position: [116.478241, 39.999802],
            visible: true,
            draggable: true,
            events: {
              click: () => {
                console.log('marker click')
              },
              dragend: (e) => {
                this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
                console.log(this.markers[0].position)
              }
            }
          }
        ]
      }
    },
    methods: {
      getMap () {
        console.log(this.amapManager.getMap())
        console.log(this.center)
      },
      addMarker () {
        let lng = 121.5 + Math.round(Math.random() * 1000) / 10000
        let lat = 31.197646 + Math.round(Math.random() * 500) / 10000
        this.markers.push([lng, lat])
      },
      addZoom () {
        this.zoom++
      },
      subZoom () {
        this.zoom--
      },
      changeCenter () {
        this.center = [this.center[0] + 0.1, this.center[1] + 0.1]
        console.log(this.center)
      }
    },
    mounted () {
      lazyAMapApiLoaderInstance.load().then(() => {
        console.log(AMap)
        this.map = new AMap.Map('amap-cointainer', {
          center: new AMap.LngLat(121.59996, 31.197646)
        })
      })
    }
  }
</script>
<style lang="scss">
  @import '../css/public';
  #space_map{
    .amap-page-container {
      height: 800px;
    }
  }
</style>