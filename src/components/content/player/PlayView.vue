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
        <PlayMsg :lyricObjArr="lyricObjArr"></PlayMsg>
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
import { getLyricData } from '@/network/detail'
export default {
  data() {
    return {
      picUrl:'',
      lyricObjArr:[]
    }
  },
  components: {
    NavBar,
    PlayControl,
    PlayMsg,
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
          return that.data.picUrl = img.src
        }
      }
    })  
    
  },
  created() {
    if(this.sequenceList.length>0 && this.currentIndex) {
      this.sequenceList[this.currentIndex].id
      this.getLyric()
    }
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
      let list = this.sequenceList
      let playIndex = (list || []).findIndex((sequenceList) => sequenceList.id === id)
      this.$store.commit('musicPlay/setCurrentIndex',playIndex)
    },

    //获取歌词
    getLyric() {
      let id = this.sequenceList[this.currentIndex].id
      console.log(id)
      getLyricData(id).then(res=>{
        if(res.data.code == 200) {
          let lyric = res.data.lrc.lyric
          console.log(lyric)
          let regNewLine = /\n/
          let LineArr = lyric.split(regNewLine)
          console.log(LineArr)
          const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
          LineArr.forEach(item => {
            if(item == '') return
            let obj = {}
            let time = item.match(regTime)
            obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
            obj.time = time ? time : ''
            obj.uid = Math.random().toString().slice(-6)
            if(obj.lyric == '') {
              console.log('此行没有歌词')
            }
            else {
              this.lyricObjArr.push(obj)
            }
          });
          console.log(this.lyricObjArr)
        }
      })
    },
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
