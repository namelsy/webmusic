<template>
  <div class="actionSheet" v-if="actionSheetShowFlag"  @click.self="actionSheetHide">
    <div class="actionSheetList">
      <ul class="actionSheetListUl">
        <li @click="addPlayOne">下一首播放</li>
        <li>收藏</li>
        <li>下载</li>
        <li>添加到歌单</li>
        <li>分享</li>
        <li>歌曲信息</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">


import { mapGetters, mapMutations, mapState,useStore } from 'vuex'
export default {
  data() {
    return {
    }
  },
  components: {
  },
  computed: {
    ...mapState('musicPlay',['playList','currentIndex','sequenceList','actionSheetShowFlag'])
  },
  methods: {
    actionSheetHide() {
      this.$store.commit('musicPlay/actionSheetHideFlag',false) 
    },
    addPlayOne() {
      let selectSong = this.$attrs.onSelectSong
      this.$store.dispatch('musicPlay/addOnePlay',selectSong) 
      this.$store.commit('musicPlay/actionSheetHideFlag',false) 
    }
  }
}
</script>

<style scoped lang="less">
  .actionSheet {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    z-index: 9999;
  }
  .actionSheetList {
    position: fixed;
    width: 90%;
    height: 50%;
    background: #fff;
    border-radius: 20px;
    left: 5%;
    top: 45%;
    display: flex;
    flex-direction: column;
    z-index: 9999;
  }
  .actionSheetListUl {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    li {
      padding: 10px;
      margin: 2px;
      font-size: 17px;
      background: #eee;
      width: 100%;
      height: 100%;
      text-align: center;
      border-radius: 5px;
    }
  }
</style>
