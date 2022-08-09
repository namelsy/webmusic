<template>
  <div class="playViewMask" v-show="playViewHideFlag">
    <div class="playViewBg" :style="bgColor">
    </div>
    <div class="playViewBox" v-if="sequenceList.length>0">
      <nav-bar>
        <template #nav-left> 
          <img src="~assets/images/icon/share/back.png" alt=""  @click.self="playViewHide">
        </template>
        <template #nav-center>
          <div style="color:aliceblue" class="songName">
            {{sequenceList[currentIndex].name}} - {{sequenceList[currentIndex].ar[0].name}}
          </div>
        </template>
        <template #nav-right> 
            <img src="~assets/images/icon/share/more.png" alt="">
        </template>
      </nav-bar>
      <PlayMsg></PlayMsg>
      <PlayControl></PlayControl>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import NavBar from '@/components/common/navBar/NavBar'
import PlayControl from '@/components/content/player/PlayControl'
import PlayMsg from '@/components/content/player/PlayMsg'

import { mapState } from 'vuex'
export default {
  data() {
    return {
    }
  },
  components: {
    NavBar,
    PlayControl,
    PlayMsg,
    PlayMsg
  },

  computed: {
    ...mapState('musicPlay',['playList','currentIndex','sequenceList','playViewHideFlag']),
    bgColor(){
      return this.sequenceList.length>0 ? {backgroundImage: 'url(' + this.sequenceList[this.currentIndex].al.picUrl + ')'} : {}
    }
  },  
  methods: {
    playViewHide() {
      this.$store.commit('musicPlay/playViewHideFlag',false) 
    },
    playSong(id) {
      let list = this.playList
      let playIndex = (list || []).findIndex((playList) => playList.id === id)
      console.log(playIndex)
      this.$store.commit('musicPlay/setCurrentIndex',playIndex) 
    }
  }
}
</script>

<style scoped lang="less">
  .playViewMask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    
  }
  .playViewBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 150%;
    height: 150%;
    filter: blur(25px) brightness(0.6);

    transform: scale(1.2);
    background-size: cover;
    z-index: 9999;
  }
  .playViewBox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }
</style>
