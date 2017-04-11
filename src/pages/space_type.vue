<template>
  <div>
    场地类型
    <router-link :to="{name: 'spaceDetail', params: {type: type}}">
      <mt-cell title="游泳" is-link></mt-cell>
    </router-link>
    <mt-cell title="室外" is-link></mt-cell>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        // 场地类型
        type: 4234
      }
    }
  }
</script>
<style lang="scss">
  @import  '../css/public'
</style>