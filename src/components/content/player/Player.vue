<template>
<audio :src="playUrl" ref="audioRef"   @error="loadError" @timeupdate="updateTime" @durationchange="durationchange"></audio>
  <div class="player" v-if="sequenceList.length>0"  :class="{playerBottomTab:$route.meta.tabBar},{playerBottom:!$route.meta.tabBar}">
    <div class="PlayMsg" @click="playViewShow">
          <div class="songCover"><img :src="sequenceList[currentIndex].al.picUrl" alt="" :class="{musicImgRotate:playing,pause:ifPaused}"></div>
          <div class="songInfo">
            <div>{{sequenceList[currentIndex].name}}</div>
            <div>&nbsp; - &nbsp;{{sequenceList[currentIndex].ar[0].name}}</div>
          </div>
        
    </div>
    <div class="playerIcon">
      <img src="~assets/images/icon/share/pause.png" v-if="playing" @click="updatePlayingStatus(false)" alt="">
      <img src="~assets/images/icon/share/player.png" v-if="!playing" @click="updatePlayingStatus(true)" alt="">
    </div>
    <div class="plagerList" @click="playListShow"><img src="~assets/images/icon/share/playerList.png" alt=""></div>
    
  </div>
  <play-list ref="playListShowHide"></play-list>
  <play-view ref="playViewShowHide"></play-view>
</template>

<script type="text/ecmascript-6">
import PlayList from './PlayList'
import PlayView from './PlayView'

// vueX
import { mapMutations, mapState,useStore,mapGetters } from 'vuex'

import {ref,watch,getCurrentInstance,provide} from 'vue'
export default {
  data() {
    return {
      ifPaused: true,
    }
  },
  components: {
    PlayList,
    PlayView
  },
  created() {
    this.$store.commit('musicPlay/setPlayingState',false) 
  },
  computed: { 
    ...mapState('musicPlay',['playList','currentIndex','sequenceList','playing','change','tmpCurrentTime','playMode','nextPlay','cutover']),
    ...mapGetters('musicPlay',['playUrl','currentTime','currentSong'])
  }, 
  setup() {
    const store = useStore()
    const that = getCurrentInstance()
    watch(()=>store.state.musicPlay.currentIndex,(newValue,oldValue)=>{
      if(newValue || newValue == 0) {
        if(store.state.musicPlay.cutover) {
          let audioRef = that.ctx.$refs['audioRef']
          audioRef.autoplay == false && (audioRef.autoplay = true )
          store.commit('musicPlay/updateCurrentTime', 0);
          // store.commit('musicPlay/playEnded', false);
          // let playUrl = 'https://music.163.com/song/media/outer/url?id=' + playId + '.mp3'
          setTimeout(() => {
            return [
            // that.playUrl = playUrl,
            audioRef.play(),
            that.data.ifPaused = false,
          ]
          },200)
        }
        
        
      }
      else {
        setTimeout(() => {
          return that.ctx.$refs['audioRef'].pause()
        },550)
      }
    },{deep:true})
    watch(()=>store.state.musicPlay.sequenceList.length,(newValue,oldValue)=>{
      if(newValue>oldValue) {
        store.commit('musicPlay/nextPlay',true) 
      }
    })
  },
  methods: {
    playListShow() {
        this.$store.commit('musicPlay/playListHideFlag',true) 
    },
    playViewShow() {
      this.$store.commit('musicPlay/playViewHideFlag',true) 
    },
    updatePlayingStatus(status) {
      // this.$refs.audioRef.src = 'https://music.163.com/song/media/outer/url?id=' + playId + '.mp3'
      if(status) {
        setTimeout(() => {
          this.$refs['audioRef'].play()
          this.ifPaused = false
          this.$store.commit('musicPlay/setPlayingState',true) 
        },100)
      }
      else {
        this.$refs['audioRef'].pause()
        this.ifPaused = true
        this.$store.commit('musicPlay/setPlayingState',false) 
      }
      
    },
    //监听音乐播放错误
    loadError(e) {
      let audio = this.$refs.audioRef
      audio.addEventListener('error',(res) => {
        if(res.target.error.code == 4) {
          this.$store.commit('musicPlay/setPlayingState',false)
          alert('该元素没有支持的来源')
        }
      })
    },
    durationchange(res) {
      let duration = res.target.duration
      if (duration > 0) {
      console.log(duration,parseInt(duration))
        this.$store.commit('musicPlay/updateDurationTime',parseInt(duration)) 
      }
    },
    updateTime() {
      var that = this
      let audioRef = this.$refs['audioRef']
      let time = parseInt(audioRef.currentTime);
      audioRef.suspend = function () {
        let timeRange = audioRef.buffered;
        if (timeRange.length > 0 && audioRef.duration > 0) {
          that.$store.commit('musicPlay/updateBufferedTime', parseInt(audioRef.buffered.end(0)));
        }
      };
      audioRef.oncanplay = function () {
        that.$store.commit('musicPlay/setPlayingState',true) 
        if (audioRef.duration > 0) {
          that.$store.commit('musicPlay/updateDurationTime',parseInt(audioRef.duration)) 
        }
      }
      audioRef.onended = function (res) {
        if(res.returnValue == true) {
          if(that.playMode == 0 ) {
            audioRef.autoplay = true 
            if(that.sequenceList !== undefined && that.sequenceList != null && that.sequenceList.length > 0) {
              if(that.currentIndex<that.sequenceList.length-1) {
                let currentIndex = that.currentIndex
                currentIndex++
                that.$store.commit('musicPlay/setCurrentIndex',currentIndex) 
                that.$store.commit('musicPlay/setChange', false);
              }
              else if(that.currentIndex = that.sequenceList.length-1) {
                let currentIndex = 0
                that.$store.commit('musicPlay/setCurrentIndex',currentIndex) 
                that.$store.commit('musicPlay/setChange', false);
              }
            }
          }
          else if(that.playMode == 1) {
            that.$store.commit('musicPlay/updateCurrentTime', 0);
            audioRef.play()
          }
          else if(that.playMode == 2) {

            if(that.sequenceList !== undefined && that.sequenceList != null && that.sequenceList.length > 0) {
              if(that.currentIndex<that.sequenceList.length-1) {
                if(that.nextPlay) {
                  let currentIndex = that.currentIndex
                  currentIndex++
                  that.$store.commit('musicPlay/setCurrentIndex',currentIndex) 
                  that.$store.commit('musicPlay/setChange', false);
                  this.$store.commit('musicPlay/nextPlay',false) 
                }
                else {
                  let number = that.sequenceList.length-1
                  let randomNum = Math.round(Math.random()*number+1);
                  let currentIndex = randomNum
                  that.$store.commit('musicPlay/setCurrentIndex',currentIndex) 
                  that.$store.commit('musicPlay/setChange', false);
                }
                
                
              }
            }
          }
          // this.$store.dispatch('musicPlay/changeMode', 0);
          // that.$store.commit('musicPlay/playEnded', true);
        }
        
      }
      if (that.change) {
        audioRef.currentTime = that.tmpCurrentTime;
        that.$store.commit('musicPlay/setChange', false);
      } else {
        that.$store.commit('musicPlay/updateCurrentTime', time);
      }
    },

  },

  
}
</script>

<style scoped lang="less">
  .playerBottomTab {
    bottom: 50px;
  }
  .playerBottom {
    bottom: 0px;
  }
  .player {
    
    position: fixed;
    width: 100%;
    height: 44px;
    background-color: #fff;
    display: flex;
    align-items: center;
    .PlayMsg {
      overflow-x: scroll;
      overflow-y: hidden;
      display: flex;
      flex-direction: row;
      height: 100%;
      flex: 1;
      align-items: center;
    }
    .playerIcon,.plagerList {
      width: 44px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 50%;
        height: 50%;
      }
    }
  }
  .van-swipe {
    width: 100%;
  }
  .songCover {
    width: 40px;
    height: 40px;
    margin: 0 10px 0 10px;
    img {
      border-radius: 50%;
      width: 90%;
      height: 90%;
    }
  }
  .songInfo {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    flex: 1;
    :nth-child(2) {
        color: #888;
        font-size: 12px;
        line-height: 25px;
      }
  }

  //播放时底栏图片旋转
  .musicImgRotate {
    animation: rotate 6s linear infinite;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .pause {
    animation-play-state: paused;
  }

</style>
