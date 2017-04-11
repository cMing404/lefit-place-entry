<template>
  <div id="space_map">
    <mt-field v-model="address" placeholder="省市区" type="number"></mt-field>
    <le-amap></le-amap>
  </div>
</template>
<script>
  // import pickAdd from '../components/pick_add.vue'
  import leAmap from '../components/le_amap.vue'
  export default {
    data () {
      return {
        map: null,
        address: ''
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
    height:torem(500px);
  }
</style>