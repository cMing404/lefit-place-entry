<template>
  <mt-header fixed :title="title">
    <mt-button v-show="showBack" icon="back" @click="back" slot="left"></mt-button>
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      title: '',
      showBack: false
    }
  },
  watch: {
    '$route': 'update'
  },
  computed: {
  },
  methods: {
    update () {
      let currentRouteName = this.$router.currentRoute.name // 检测路由名称
      let result = this.$route.path.match(/\//g) // 检测路由层级
      switch (currentRouteName) {
        case 'order': this.title = '订单'
          break
        case 'space': this.title = '场地发布'
          break
        case 'user': this.title = '我的'
          break
      }
      if (result && result.length > 1) {
        this.showBack = true
      } else {
        this.showBack = false
      }
    },
    back () {
      this.$router.go(-1)
    }
  },
  created () {
    this.update()
  }
}
</script>

<style lang="scss">
</style>
