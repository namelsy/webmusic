<template>
  <div class="playMsg">
    <list-display class="playMsgList">
      <list-display-item v-for="item in lyricObjArr" :key="item.uid" :class="{bgColor:index == currentIndex}">
        <template #listDisplayItemMsg>
          <div class="LyricShow">
            {{item.lyric}}
          </div>
        </template>
      </list-display-item>
    </list-display>
  </div>

</template>

<script type="text/ecmascript-6">
import ListDisplay from '../listDisplay/ListDisplay'
import ListDisplayItem from '../listDisplay/ListDisplayItem'

export default {
  data() {
    return {

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
  mounted() {
      console.log(this)
    }
}
</script>

<style scoped>
  .playMsg {
    height: 60%;
    position: fixed;
    top: 8%;
    width: 100%;
    z-index: 9999;
  }
  .LyricShow {
    display: flex;
    justify-content: center;
    color: aliceblue;
  }
  .playMsgList>:first-child {
       margin-top: 50%;
  }
  .playMsgList>:last-child {
       margin-bottom: 50%;
  }
</style>
