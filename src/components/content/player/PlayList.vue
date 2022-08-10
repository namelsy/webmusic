<template>
  <div class="playListMask" @click.self="playListHide" v-if="playListHideFlag">
    <div class="playList">
      <div class="playListTitle">当前播放<span> ({{sequenceList.length}})</span></div>
      <div class="playListControl"></div>
      <list-display>
        <list-display-item v-for="(item,index) in sequenceList" :key="item.id" :class="{bgColor:index == currentIndex}">
          <template #listDisplayItemNow>
            {{index + 1}}
          </template>
          <template #listDisplayItemNum>

          </template>
          <template #listDisplayItemMsg>
              <div class="songName">{{item.name}}</div>
              <div class="singer">{{item.ar[0].name}}</div>
          </template>
          <template #listDisplayItemMv>
            <img src="~assets/images/icon/share/playerGray.png" alt="" @click="playSong(item.id)">
          </template>
          <template #listDisplayItemMore>
            <img src="~assets/images/icon/play/deleteGray.png" alt="" @click="removeSong(item.id)">
          </template>
        </list-display-item>
      </list-display>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ListDisplay from '@/components/content/listDisplay/ListDisplay'
import ListDisplayItem from '@/components/content/listDisplay/ListDisplay'

import { mapState } from 'vuex'
export default {
  data() {
    return {
    }
  },
  components: {
    ListDisplay,
    ListDisplayItem
  },

  computed: {
    ...mapState('musicPlay',['playList','currentIndex','sequenceList','playListHideFlag'])
  },  
  methods: {
    playListHide() {
      this.$store.commit('musicPlay/playListHideFlag',false) 
    },
    playSong(id) {
      let list = this.sequenceList
      let playIndex = (list || []).findIndex((sequenceList) => sequenceList.id === id)
      this.$store.commit('musicPlay/setCurrentIndex',playIndex)
    },
    removeSong(id) {
      let list = this.sequenceList
      let removeIndex = (list || []).findIndex((sequenceList) => sequenceList.id === id)
      list[removeIndex]
      this.$store.dispatch('musicPlay/removeSong',list[removeIndex]) 
      this.$store.commit('musicPlay/Cutover', false);
    }
  }
}
</script>

<style scoped lang="less">
  .playListMask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    z-index: 9999;
  }
  .playList {
    position: fixed;
    width: 90%;
    height: 65%;
    background: #fff;
    border-radius: 20px;
    left: 5%;
    top: 30%;
    display: flex;
    flex-direction: column;
    z-index: 9999;
    .playListTitle {
      margin: 12px;
      font-size: 16px;
      font-weight: 600;
      color: #000;
      display: flex;
      align-items: center;
      span {
        color: #888;
        font-size: 15px;
        line-height: 16px;
        display: inline-block;
        margin-left: 5px;
        letter-spacing: 2px;
      }
    }

    .playListControl {
      width: 100%;
      height: 40px;
    }
    
  }
  .songName {
      font-size: 15px;
  }
  .singer {
    font-size: 13px;
    color: #999;
  }
  .bgColor {
    background-color: #ddd;
  }
</style>
