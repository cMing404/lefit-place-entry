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
        classSet: null,
        classList: [],
        classVal: [],
        storeId: this.$route.params.id,
        type: this.$route.query.type
      }
    },
    computed: {
      ...mapGetters({
        space: 'getSpace'
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
      getStoreClassSet () {
        this.$ajax(this.$API.getStoreClassSet, {
          storeAreaTypeKey: this.type,
          storeId: this.storeId
        }, res => {
          let arr = []
          this.classList = res.storeClassSetResps.map(v => {
            v.classIsOpen && arr.push(v.classId)
            return {
              label: v.className,
              value: v.classId,
              classIsOpen: v.classIsOpen,
              classServiceType: v.classServiceType,
              storeId: v.storeId,
              classServiceName: v.classServiceName
            }
          })
          this.classVal = arr
        }, err => {
          this.$MsgBox({msg: err.code + ':服务器跑步去了'})
        }, fail => {
          this.$MsgBox({msg: '服务器跑步去了'})
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
      if (this.space.spaceClass.length === 0) {
        this.getStoreClassSet()
      } else {
        this.classList = this.space.spaceClass
        this.space.spaceClass.forEach(v => {
          v.isOpen && this.classVal.push(v.value)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../css/public';
  @import './suit_class';
</style>
