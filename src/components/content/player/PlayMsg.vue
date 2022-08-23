<template>
  <div class="playMsg">
    <transition name="playMsgList">
      <list-display class="playMsgList" @click="a" id="playMsgList" ref="playMsgList">
        <list-display-item v-for="(item,index) in lyricObjArr" :key="item.uid">
          <template #listDisplayItemMsg>
            <div class="LyricShow" :class="{bgColor:alignInex == index}">
              {{item.lyric}}
            </div>
          </template>
        </list-display-item>
      </list-display>
    </transition>
  </div>

</template>

<script type="text/ecmascript-6">
import ListDisplay from '../listDisplay/ListDisplay'
import ListDisplayItem from '../listDisplay/ListDisplayItem'

import { mapGetters, mapState,useStore } from 'vuex'
import { watch,getCurrentInstance } from 'vue'
export default {
  data() {
    return {
      alignInex: 0
    }
  },
  components: {
    ListDisplay,
    ListDisplayItem
  },
  props: {
    lyricObjArr: {
      type:Array,
      default() {
        return []
      }
    },
  },
  computed: {
    ...mapState('musicPlay',['playList','currentIndex','sequenceList','playViewHideFlag','currentTime']),
    ...mapGetters('musicPlay',[ 'prCurrentTime',]), 
  }, 
  setup() {
    const store = useStore()
    const that = getCurrentInstance()
    watch(()=>store.state.musicPlay.currentTime, (newVal)=> {
      if(newVal) {
        // let scroll = document.getElementById('playMsgList')
        // let prCurrentTime = store.state.musicPlay.currentTime/store.state.musicPlay.durationTime * 100
        // scroll.scrollTop  = prCurrentTime/100 * scroll.scrollHeight

        let lyricObjArr = that.props.lyricObjArr
        lyricObjArr.forEach((item,index) => {
          if(store.state.musicPlay.currentTime == item.time) {
            let prCurrentTime = store.state.musicPlay.currentTime/store.state.musicPlay.durationTime * 100
            let scroll = document.getElementById('playMsgList')
            scroll.style = `
            transition: all linear 0.7s;
            transform: translateY(${-50 * index}px)
            `
            // scroll.scrollTop  = prCurrentTime/100 * scroll.scrollHeight - 400 
            let alignInex = index
            return that.data.alignInex = alignInex
          }
        });
      }
    },{deep:true})
  },
  mounted() {
    // let item = document.getElementById('playMsgList')
    
    // item.style.transform = `translateY(${-100}px)`
  },
  updated() {
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
  .playMsg {
    height: 60%;
    position: fixed;
    top: 8%;
    width: 100%;
    z-index: 9999;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .LyricShow {
    display: flex;
    justify-content: center;
    color: #ccc;
  }
  .playMsgList {
    overflow: visible;
  }
  .playMsgList>:first-child {
       margin-top: calc(50% - 25px) ;
  }
  .playMsgList>:last-child {
       margin-bottom: 50%;
  }
  .bgColor {
    color: #fff;
  }

   //动画 
  .playMsgList-enter-active {
    animation: playMsgList 0.2s linear;
  }
  .playMsgList-leave-active {
    animation: playMsgList 0.2s linear reverse;
  }

</style>
