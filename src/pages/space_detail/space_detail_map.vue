<template>
  <div id="space_map">
    <mt-cell title="省、市、区" :value="mapCache.prov_area_text?mapCache.prov_area_text:'请选择'" is-link @click.native="picker.show(undefined)"></mt-cell>
    <mt-field v-model="mapCache.detail_addr" placeholder="详细地址" type=""></mt-field>
    <div class="container">
      <le-amap :prov_area="mapCache.prov_area_text" :detail_addr="mapCache.detail_addr" :posShow="mapCache.posShow" v-on:submit="getMapInfo"></le-amap>
    </div>
  </div>
</template>
<script>
  import leAmap from '../../components/le_amap.vue'
  import { mapGetters } from 'vuex'
  import Picker from 'better-picker'

  export default {
    data () {
      return {
        map: null,
        picker: null,
        popupShow: false,
        indexTemp: [], // 缓存省市区滚动时产生的值对应placesMap中的index
        pickerData: [],
        provs: [],
        cities: [{text: '请选择',value: 1}],
        areas: [{text: '请选择', value: 1}],
        pickerSelected: [0, 0, 0],
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
        spaceDetail: 'getSpaceDetail',
        token: 'getUserToken'
      })
    },
    methods: {
      closePopup () {
        this.popupShow = false
      },
      initPicker (obj) {
        this.placesMap = window.global.placesMap
        let cities = [], area = []
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
          selectedIndex: this.pickerSelected,
          title: ''
        })
        if (obj && obj.area && obj.prov && obj.city) {
          this.resetPicker(obj)
          this.picker = this.picker = new Picker({
            data: [this.provs, this.cities, this.areas],
            selectedIndex: this.pickerSelected,
            title: ''
          })
        }
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
          this.mapCache.prov_area = selectedVal
          this.mapCache.prov_area_text = this.picker.data.map((v, i) => {
            let text = v[selectedIndex[i]].text
            return text
          }).join(' ')
          this.mapCache.detail_addr = ''
        })
      },
      resetPicker (obj) {
        let i = 0,j = 0, cities = [], areas = []
        for (let i = 0; i < this.placesMap.length; i++) {
          if (~~this.placesMap[i].value === obj.prov) {
            cities = this.placesMap[i].children
            this.indexTemp[0] = i
            for (let j = 0; j < cities.length; j++) {
              if (~~cities[j].value === obj.city) {
                areas = cities[j].children
                for (let k = 0; k < areas.length; k++) {
                  if (~~areas[k].value === obj.area) {
                    this.pickerSelected = [i, j, k]
                    this.mapCache.prov_area = [this.placesMap[i].value * 1, cities[j].value * 1, areas[k].value * 1]
                    this.mapCache.prov_area_text = this.placesMap[i].label + ' ' + cities[j].label + ' ' + areas[k].label
                    break
                  }
                }
              }
            }
          }
        }
        this.cities = cities.map(v => {
          return {
            text: v.label,
            value: v.value
          }
        })
        this.areas = areas.map(v => {
          return {
            text: v.label,
            value: v.value
          }
        })
      },
      fetchArr (arr, index, selectedIndex, str) { //  抽取出一个专用于更新下拉框 第二栏和第三栏的方法
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].value === this.picker.data[index][selectedIndex].value) {
            let arrTemp = arr[i].children.map((v, i) => {
              return {
                text: v.label,
                value: v.value
              }
            })
            if (str === 'init') {
              this.indexTemp[index] = [i]
              return arrTemp
            }
            this.picker.refillColumn(index + 1, arrTemp)
            this.indexTemp[index] = [i]
            break
          }
        }
      },
      getMapInfo (data) {
        if (!this.mapCache.detail_addr) {
          alert('请填写完整的详细地址')
          return false
        }
        if (data) {
          this.mapCache.mapPos = data
          this.$ajax(this.$API.updateStoreArea, {
            id: this.$route.params.id,
            token: this.token,
            addressInfo: {
              lng: this.mapCache.mapPos.selected[0],
              lat: this.mapCache.mapPos.selected[1],
              address: this.mapCache.detail_addr,
              provinceId: this.mapCache.prov_area[0],
              city: this.mapCache.prov_area[1],
              countyId: this.mapCache.prov_area[2]
            }
          }, res => {
            this.$router.go(-1)
          }, err => {
            this.$MsgBox({msg: err.code + ':服务器跑步去了'})
          }, fail => {
            this.$MsgBox({msg: '服务器跑步去了'})
          })
        }
      },
      detailMapDeal (data) {
        if (data.addressInfo) {
          this.initPicker({
            prov: data.addressInfo.provinceId,
            city: data.addressInfo.city,
            area: data.addressInfo.countyId
          })
          this.prov_area = [data.addressInfo.provinceId, data.addressInfo.city, data.addressInfo.countyId]
          this.mapCache.detail_addr = data.addressInfo.address
          this.mapCache.posShow = [data.addressInfo.lng, data.addressInfo.lat]
        } else {
          this.initPicker()
        }
      }
    },
    beforeDestroy () {
      // 清除picker节点防止内存泄漏
      let removeDOM = document.getElementsByClassName('picker')
      if (removeDOM.length > 0) {
        for (let i = 0,len = removeDOM.length; i < len; i++) {
          removeDOM[0].parentNode.removeChild(removeDOM[0])
        }
      }
      this.picker = null
    },
    mounted () {
      if (Object.keys(this.spaceDetail).length > 0) {
        this.detailMapDeal(this.spaceDetail)
      } else {
        this.$store.dispatch('pushSpaceDetail', {id: this.$route.params.id, reload: false}).then(res => {
          this.detailMapDeal(res)
        }).catch(err => {
          this.$MsgBox({msg: err.resultmessage || '服务器跑步去了'})
        })
      }
    },
    components: {
      leAmap
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../css/public';
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
