<template>
  <div id="space_map">
    <mt-cell title="省、市、区" :value="mapCache.prov_area_text?mapCache.prov_area_text:'请选择'" is-link @click.native="picker.show(undefined)"></mt-cell>
    <mt-field v-model="mapCache.detail_addr" placeholder="详细地址" type=""></mt-field>
    <div class="container">
      <le-amap :prov_area="mapCache.prov_area_text" :detail_addr="mapCache.detail_addr" :mapPos="mapCache.mapPos" v-on:submit="getMapInfo"></le-amap>
      <!--<le-amap :prov_area="mapCache.prov_area_text" :detail_addr="mapCache.detail_addr" :selected="mapCache.mapPos?mapCache.mapPos.selected:[]" v-on:submit="getMapInfo"></le-amap>-->
    </div>
  </div>
</template>
<script>
  import leAmap from '../components/le_amap.vue'
  import { mapGetters } from 'vuex'
  import Picker from 'better-picker'
  export default {
    data () {
      return {
        map: null,
        popupShow: false,
        indexTemp: [], // 缓存省市区滚动时产生的值对应placesMap中的index
        pickerData: [],
        provs: [],
        cities: [{text: '请选择',value: 1}],
        areas: [{text: '请选择', value: 1}],
        placesMap: null,
        mapCache: {
          prov_area: [], // 保存省市区选择完的值
          prov_area_text: '', // 文本展示
          detail_addr: '',
          mapPos: {}
        }
      }
    },
    computed: {
      ...mapGetters({
        getSpace: 'getSpace' // 先测试一下 应该可以
      })
    },
    methods: {
      closePopup () {
        this.popupShow = false
      },
      selectProv () {
      },
      initPicker () {
        this.placesMap = window.global.placesMap
        this.provs = this.placesMap.map((v, i, a) => {
          return {
            text: v.label,
            value: v.value
          }
        })
        this.cities = this.placesMap[0].children.map((v) => {
          return {
            text: v.label,
            value: v.value
          }
        })
        this.areas = this.placesMap[0].children[0].children.map((v) => {
          return {
            text: v.label,
            value: v.value
          }
        })
        this.picker = new Picker({
          data: [this.provs, this.cities, this.areas],
          selectedIndex: [0, 0, 0],
          title: ''
        })
        this.picker.on('picker.select', (selectedVal, selectedIndex) => {
        })
        this.picker.on('picker.change', (index, selectedIndex) => {
          switch (index) {
            case 0:
              this.fetchArr(this.placesMap, index, selectedIndex)
              this.fetchArr(this.placesMap[this.indexTemp[0]].children, 1, 0)
              break
            case 1:
              this.fetchArr(this.placesMap[this.indexTemp[0]].children, index, selectedIndex)
              break
          }
        })
        this.picker.on('picker.valuechange', (selectedVal, selectedIndex) => {
          this.mapCache.prov_area_text = this.picker.data.map((v, i) => {
            let text = v[selectedIndex[i]].text
            this.mapCache.prov_area.push(text)
            return text
          }).join(' ')
          this.mapCache.detail_addr = ''
        })
      },
      fetchArr (arr, index, selectedIndex) { //  抽取出一个专用于更新下拉框 第二栏和第三栏的方法
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].value === this.picker.data[index][selectedIndex].value) {
            let arrTemp = arr[i].children.map((v, i) => {
              return {
                text: v.label,
                value: v.value
              }
            })
            this.picker.refillColumn(index + 1, arrTemp)
            this.indexTemp[index] = [i]
            break
          }
        }
      },
      getMapInfo (data) {
        if (data) {
          this.mapCache.mapPos = data
          this.$store.commit('cacheMapInfo', this.mapCache)
          this.$router.go(-1)
        }
      }
    },
    created () {
      this.initPicker()
      if (Object.keys(this.getSpace.mapCache).length > 0) {
        this.mapCache = this.getSpace.mapCache
      }
    },
    components: {
      leAmap
    }
  }
</script>
<style lang="scss" scoped>
  @import '../css/public';
  #space_map{
    width:100%;
    .container{
      position:absolute;
      top:0;
      left:0;
      height:100%;
      width:100%;
      z-index:-1;
    }
  }
</style>