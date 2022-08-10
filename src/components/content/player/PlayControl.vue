<template>
  <div class="playControl">
    <nav-bar>
        <template #nav-left> 
          <div class="leftDate">
            {{time}}
          </div>
        </template>
        <template #nav-center>
            <van-slider v-model="prCurrentTime" active-color="#666" @change="onChange"> 
              <template #button>
                <div class="custom-button"></div>
              </template>
            </van-slider>
        </template>
        <template #nav-right> 
          <div class="rightDate">
            <!-- {{durationTime}} -->
            {{duration}}
          </div>
        </template>
    </nav-bar>
    <div class="playAdjust">
      <!-- 播放模式 -->
      <div class="playAdjustItem">
        <img src="~assets/images/icon/play/listLoop.png" alt="" @click="PlayMode()" v-if="playMode == 0">
        <img src="~assets/images/icon/play/singleCycle.png" alt="" @click="PlayMode()"  v-if="playMode == 1">
        <img src="~assets/images/icon/play/random.png" alt="" @click="PlayMode()"  v-if="playMode == 2">
      </div>
      <!-- 前 -->
      <div class="playAdjustItem">
        <img src="~assets/images/icon/play/previous.png" alt="" @click="previous">
      </div>
      <!-- 开始暂停 -->
      <div class="playAdjustItem">
        <img src="~assets/images/icon/play/pause.png" v-if="playing" @click="updatePlayingStatus(false)" alt="">
        <img src="~assets/images/icon/play/play.png" v-if="!playing" @click="updatePlayingStatus(true)" alt="">
      </div>
      <!-- 后 -->
      <div class="playAdjustItem">
        <img src="~assets/images/icon/play/next.png" alt="" @click="nextSong">
      </div>
      <!-- 列表 -->
      <div class="playAdjustItem">
        <img src="~assets/images/icon/play/playList.png" alt=""  @click="playListShow">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import NavBar from '@/components/common/navBar/NavBar'

import { ref,getCurrentInstance, useContext,watch, } from 'vue';
import { mapGetters, mapMutations, mapState,useStore } from 'vuex'
export default {
  data() {
    return {
    }
  },
  components: {

  },
  computed: { 
    ...mapState('musicPlay',[
        'playList',
        'currentIndex',
        'sequenceList',
        'playing',
        'change',
        'currentTime',
        'bufferedTime',
        'durationTime',
        'playEnded',
        'playMode'
        
      ]),
    ...mapGetters('musicPlay',[
      'prCurrentTime',
    ]),
    
    // 时间字符格式化
    time () {
      let currentTime = this.currentTime
      let long = Math.floor(parseInt(currentTime));
      let minute = Math.floor(currentTime / 60);
      if (minute < 10) {
        minute = '0' + minute;
      }
      let second = long % 60;
      if (second < 10) {
        second = '0' + second;
      }
      return minute + ':' + second;
    },
    duration() {
      let durationTime = this.durationTime
      let long = Math.floor(parseInt(durationTime));
      let minute = Math.floor(durationTime / 60);
      if (minute < 10) {
        minute = '0' + minute;
      }
      let second = long % 60;
      if (second < 10) {
        second = '0' + second;
      }
      return minute + ':' + second;
    }
  }, 
  
  setup() {
    const store = useStore()
    const that = getCurrentInstance()
    watch(store.state.musicPlay.prCurrentTime,newVal => {
        return that.prCurrentTimes = store.state.musicPlay.prCurrentTime
    })
    watch(store.state.musicPlay.prCurrentTime,newVal => {
      if(newVal == 100) {
        if(playMode == 0) {
          return that.nextSong()
        }
      }
    })
    
  },
  methods: {
    seeked() {
      let audioRef = this.$parent.$parent.$refs.audioRef
      audioRef.seeked = function () {
      }
    },
    onChange(value) {
      let time = (value * this.durationTime) / 100;
      this.$store.commit('musicPlay/changeTime', time);
      this.$store.commit('musicPlay/setChange', true);

      this.$store.commit('musicPlay/updateCurrentTime', time);
      // let audioRef = this.$parent.$parent.$refs.audioRef
      // that.$store.commit('musicPlay/updateCurrentTime', time);
    },
    async updatePlayingStatus(status) {
      let audioRef = this.$parent.$parent.$refs.audioRef
      try {
        if(audioRef.paused) {
          await audioRef.play()
          this.ifPaused = false
          this.$store.commit('musicPlay/setPlayingState',true) 
        }
        else{
          audioRef.pause()
          this.ifPaused = true
          this.$store.commit('musicPlay/setPlayingState',false) 
        }
      } catch(err) {
        this.$store.commit('musicPlay/setPlayingState',false)
      }
      
      
    },
    previous() {
      if(this.sequenceList !== undefined && this.sequenceList != null && this.sequenceList.length > 0) {
        if(this.currentIndex>0) {
          let currentIndex = this.currentIndex
          currentIndex--
          this.$store.commit('musicPlay/Cutover', true);
          this.$store.commit('musicPlay/setCurrentIndex',currentIndex) 
          this.$store.commit('musicPlay/setChange', false);
        }
      }
    },
    nextSong() {
        if(this.sequenceList !== undefined && this.sequenceList != null && this.sequenceList.length > 0) {
          if(this.playMode == 2) {
            let number = this.sequenceList.length-1
            let randomNum = Math.round(Math.random()*number+1);
            let currentIndex = randomNum
            this.$store.commit('musicPlay/setCurrentIndex',currentIndex) 
            this.$store.commit('musicPlay/setChange', false);
            this.$store.commit('musicPlay/Cutover', true);
          }
          else {
            if(this.currentIndex<this.sequenceList.length-1) {
              let currentIndex = this.currentIndex
              currentIndex++
              this.$store.commit('musicPlay/Cutover', true);
              this.$store.commit('musicPlay/setCurrentIndex',currentIndex) 
              this.$store.commit('musicPlay/setChange', false);
            }
          }
        }
    },
    PlayMode(type) {
      let audioRef = this.$parent.$parent.$refs.audioRef
      if(this.playMode == 0) {
         this.$store.dispatch('musicPlay/changeMode', 1);
      }
      else if(this.playMode== 1) {
        this.$store.dispatch('musicPlay/changeMode', 2);
      }
      else if(this.playMode== 2) {
        this.$store.dispatch('musicPlay/changeMode', 0);
      }
    },
    playListShow() {
      this.$store.commit('musicPlay/playListHideFlag',true)
    }
  }
}
</script>

<style scoped lang="less">
  .playControl {
    position: fixed;
    width: 100%;
    height: 30%;
    bottom: 0;
  }
  .van-slider {
    width: 95%;
  }
  .leftDate {
    color: aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .rightDate {
    color: #777;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .custom-button {
    width: 10px;
    height: 10px;
    color: #fff;
    font-size: 10px;
    line-height: 10px;
    text-align: center;
    background-color: #fff;
    border-radius: 50%;
  }

  .playAdjust {
    width: 94%;
    margin-left: 3%;
    height: 100px;
    display: flex;
    align-items: center;
  }
  .playAdjustItem {
    width: 70px;
    flex: 1;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 60%;
      height: 60%;
    }
  }
</style>
