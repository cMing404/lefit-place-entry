<template>
  <div id="space-page">
    <div>想要发布什么类型的场地?</div>
    <mt-cell title="标题文字" is-link>
      <img slot="icon" src="" width="24" height="24">
    </mt-cell>
    <router-link :to="{name: 'spaceType'}">
      <span id="space_add" class="icon"></span>
    </router-link>
    <router-view></router-view>
  </div>
</template>
<script>
  
</script>
<style lang="scss" scoped>
  @import '../css/public.scss';
  #space_add{
    display:block;
    background:rgb(117, 49, 49);
    width:torem(150px);
    height:torem(150px);
    position:fixed;
    bottom:torem(200px);
    right:torem(50px);
  }
</style>