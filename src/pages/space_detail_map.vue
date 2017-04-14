<template>
  <div id="space_map">
    <mt-cell title="省、市、区" value="请选择" is-link @click.native="picker.show"></mt-cell>
    <mt-field v-model="detail_add" placeholder="详细地址" type=""></mt-field>
    <le-amap :prov_area="prov_area" :detail_add="detail_add"></le-amap>
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
        prov_area: [], // 保存省市区选择完的值
        detail_add: '',
        pickerData: [],
        provs: [],
        cities: [{text: '请选择',value: ''}],
        areas: [{text: '请选择', value: ''}],
        spacesMap: {
          name: 'test'
        },
        placeMap: null
      }
    },
    computed: {
      ...mapGetters({
        spaceMap: 'spaceMap' // 先测试一下 应该可以
      })
    },
    methods: {
      closePopup () {
        this.popupShow = false
      },
      selectProv () {
      },
      updateCity (i) {

      }
    },
    created () {
      this.placesMap = window.global.placesMap
      this.provs = this.placesMap.map((v, i, a) => {
        return {
          text: v.label,
          value: v.value
        }
      })
      console.log(this.provs)
      this.picker = new Picker({
        data: [this.provs, this.cities, this.areas],
        selectedIndex: [0, 0, 0],
        title: '我是小学生'
      })
      this.picker.on('picker.select', (selectedVal, selectedIndex) => {
        console.log('选择了')
        console.log(selectedVal)
        this.prov_area = selectedIndex
      })
      this.picker.on('picker.change', (index, selectedIndex) => {
        console.log('改变了')
        console.log(this.picker.data[index][selectedIndex])
      })
      this.picker.on('picker.valuechange', (selectedVal, selectedIndex) => {
        console.log('滚动了')
        console.log(selectedVal)
        console.log(selectedIndex)
      })
    },
    components: {
      leAmap
    }
  }
</script>
<style lang="scss">
  @import '../css/public';
  #space_map{
    width:100%;
    height:torem(450px);
  }
</style>