<template>
  <div id="space_detail_calss">
    <article class="list_tit">
      <span></span>
      <div @click="selectAll"><i :class="{selected: selectAllState}"></i><span>全选</span></div>
    </article>
    <mt-checklist v-model="classVal" :options="classList" align="right"></mt-checklist>
    <mt-button type="primary" size="large" @click="save">保存</mt-button>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        classList: [],
        classVal: [],
        storeId: this.$route.params.id,
        type: this.$route.query.type
      }
    },
    computed: {
      ...mapGetters({
        spaceDetail: 'getSpaceDetail'
      }),
      selectAllState () {
        return this.classVal.length === this.classList.length
      }
    },
    methods: {
      selectAll () {
        if (this.selectAllState) {
          this.classVal = []
        } else {
          this.classVal = this.classList.map(v => v.value)
        }
      },
      getClassList (arr) {
        return arr.map(v => {
          v.classIsOpen && this.classVal.push(v.classId)
          return {
            label: v.className,
            value: v.classId,
            classIsOpen: v.classIsOpen,
            classServiceType: v.classServiceType,
            storeId: v.storeId,
            classServiceName: v.classServiceName
          }
        })
      },
      save () {
        let arr = this.classList.map(v => {
          return {
            classId: v.value,
            storeId: v.storeId,
            className: v.label,
            classServiceType: v.classServiceType,
            classIsOpen: this.classVal.indexOf(v.value) !== -1 ? 1 : 0
          }
        })
        this.$ajax(this.$API.updateStoreClassSetStatus, arr, res => {
          this.$router.go(-1)
        }, err => {
          this.$MsgBox({msg: err.code + ':服务器跑步去了'})
        }, fail => {
          this.$MsgBox({msg: '服务器跑步去了'})
        })
      }
    },
    created () {
      if (Object.keys(this.spaceDetail).length > 0) {
        this.classList = this.classList = this.getClassList(this.spaceDetail.classSetResp.storeClassSetResps)
      } else {
        this.$store.dispatch('pushSpaceDetail', {id: this.$route.params.id, reload: false}).then(res => {
          this.classList = this.getClassList(res.classSetResp.storeClassSetResps)
        }).catch(err => {
          this.$Msgbox({msg: err.resultmessage || '服务器跑步去了'})
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../css/public';
  @import './suit_class';
</style>
