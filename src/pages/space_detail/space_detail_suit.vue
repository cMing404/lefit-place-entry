<template>
  <div id="space_detail_suit">
    <article class="list_tit">
      <span></span>
      <div @click="selectAll"><i :class="{selected: selectAllState}"></i><span>全选</span></div>
    </article>
    <mt-checklist v-model="equipVal" :options="equipList" align="right"></mt-checklist>
    <mt-button type="primary" size="large" @click="save">保存</mt-button>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        equipList: [],
        equipVal: []
      }
    },
    computed: {
      ...mapGetters({
        spaceDetail: 'getSpaceDetail'
      }),
      selectAllState () {
        return this.equipList.length === this.equipVal.length
      }
    },
    methods: {
      getEquipList (arr) {
        return arr.map(v => {
          v.equipNum && this.equipVal.push(v.equipId)
          return {
            label: v.equipName,
            value: v.equipId,
            disabled: false,
            equipType: v.equipType,
            storeId: v.storeId,
            id: v.id
          }
        })
      },
      save () {
        let arr = this.equipList.map(v => {
          return {
            id: v.id,
            storeId: v.storeId,
            equipName: v.label,
            equipType: v.equipType,
            equipNum: this.equipVal.indexOf(v.value) !== -1 ? 1 : 0,
            equipId: v.equipVal
          }
        })
        this.$ajax(this.$API.modifyStoreEquipNum, arr, res => {
          this.$router.go(-1)
        }, err => {
          this.$MsgBox({msg: err.code + ':服务器跑步去了'})
        }, fail => {
          this.$MsgBox({msg: '服务器跑步去了'})
        })
      },
      selectAll () {
        if (this.selectAllState) {
          this.equipVal = []
        } else {
          this.equipVal = this.equipList.map(v => v.value)
        }
      }
    },
    created () {
      if (Object.keys(this.spaceDetail).length > 0) {
        this.equipList = this.getEquipList(this.spaceDetail.queryStoreEquipResp.storeEquipResps)
      } else {
        this.$store.dispatch('pushSpaceDetail', {id: this.$route.params.id, reload: false}).then(res => {
          this.equipList = this.getEquipList(res.queryStoreEquipResp.storeEquipResps)
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