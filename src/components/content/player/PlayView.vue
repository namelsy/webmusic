<template>
  <transition name="playView" appear>
    <div class="playViewMask" v-show="playViewHideFlag">
      <div class="playViewBg" :style="{backgroundImage:`url(${picUrl})`}">
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
  </transition>
</template>

<script type="text/ecmascript-6">
import NavBar from '@/components/common/navBar/NavBar'
import PlayControl from '@/components/content/player/PlayControl'
import PlayMsg from '@/components/content/player/PlayMsg'

import { mapState,useStore } from 'vuex'
import { watch,getCurrentInstance } from 'vue'
export default {
  data() {
    return {
      picUrl:''
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
    // bgColor(){
    //   return this.sequenceList.length>0 ? {backgroundImage: 'url(' + this.sequenceList[this.currentIndex].al.picUrl + ')'} : {}
    // }
    // picUrl() {
    //   return this.sequenceList[this.currentIndex].al.picUrl
    // }
    
  },  
  setup() {
    const store = useStore()
    const that = getCurrentInstance()
    console.log(store.state.musicPlay.currentIndex)
    watch(()=>store.state.musicPlay.currentIndex, (newVal)=> {
      if(newVal || newVal == 0) {
        let img = new  Image()
        img.src = store.state.musicPlay.sequenceList[store.state.musicPlay.currentIndex].al.picUrl
        img.onload =function() {
          return that.data.picUrl = img.src,console.log(that)
        }
      }
    })  
    
  },
  mounted() {
    if(this.sequenceList.length>0) {
      this.picUrl = this.sequenceList[this.currentIndex].al.picUrl
    }
  },
  methods: {
    playViewHide() {
      this.$store.commit('musicPlay/playViewHideFlag',false) 
    },
    playSong(id) {
      let list = this.playList
      let playIndex = (list || []).findIndex((playList) => playList.id === id)
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
    filter: blur(25px) brightness(0.5);

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
  //过渡
  // .playView-enter, .playView-leave-to {
  //   transform: translateY(200%);
  // }
  // .playView-enter-to, .playView-leave {
  //   transform: translateY(0);
  // }
  // .playView-enter-active, .playView-leave-active {
  //   transition: 0.5s linear;
  // }

  //动画
  .playView-enter-active {
    animation: playView 0.2s linear;
  }
  .playView-leave-active {
    animation: playView 0.2s linear reverse;
  }
  @keyframes playView {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
</style>
