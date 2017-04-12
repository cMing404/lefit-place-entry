<template>
  <div id="space_map">
    <mt-field v-model="prov_area" placeholder="省市区" type=""></mt-field>
    <mt-field v-model="detail_add" placeholder="详细地址" type=""></mt-field>
    <le-amap :prov_area="prov_area" :detail_add="detail_add"></le-amap>
  </div>
</template>
<script>
  import leAmap from '../components/le_amap.vue'
  export default {
    data () {
      return {
        map: null,
        prov_area: '',
        detail_add: ''
      }
    },
    methods: {
    },
    mounted () {
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