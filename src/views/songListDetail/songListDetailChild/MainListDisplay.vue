<template>
  <div class="MainListDisplay">
    <list-display>
      <list-display-item v-for="(item,index) in songListDetailData" :key="item.id" @click="querySongDetail(item.id)" :class="{bgColor:index == currentIndex}">
        <template #listDisplayItemNow>
          {{index + 1}}
        </template>
        <template #listDisplayItemNum>

        </template>
        <template #listDisplayItemMsg>
          <div class="ItemMsg">
            <div class="songName">{{item.name}}</div>
            <div class="singer">{{item.ar[0].name}}</div>
            <div class="listDisplayItemMv">
              <img src="~assets/images/icon/share/playerGray.png" alt="">
            </div>
          </div>
        </template>
        <template #listDisplayItemMore>
          <img src="~assets/images/icon/share/moreGray.png" alt="" @click.stop="ActionSheetShow(index)">
        </template>
      </list-display-item>
    </list-display>
    <action-sheet @selectSong="selectSong"></action-sheet>
  </div>

</template>

<script type="text/ecmascript-6">
import ListDisplay from '@/components/content/listDisplay/ListDisplay'
import ListDisplayItem from '@/components/content/listDisplay/ListDisplay'
import ActionSheet from '@/components/content/actionSheet/ActionSheet'                    

import { mapState } from 'vuex'
export default {
  props: {
    songListDetailData: {
      type:Array,
      default() {
        return []
      }
    },
  },
  data() {
    return {
      bgColor: '',
      selectSong: ''
    }
  },
  components: {
    ListDisplay,
    ListDisplayItem,
    ActionSheet
  },
  computed: { 
    ...mapState('musicPlay',['playList','currentIndex','sequenceList','playing']),
  }, 
  methods: {
    querySongDetail(id) {
      //查找指定ID的索引
      let list = this.songListDetailData
      let playIndex = (list || []).findIndex((songListDetailData) => songListDetailData.id === id)
      this.$store.commit('musicPlay/Cutover', true);
      this.$store.dispatch('musicPlay/addAllPlay',{list,playIndex})
      this.$store.commit('musicPlay/playViewHideFlag',true)
      this.$emit('onClickSongList')
    },
    ActionSheetShow(index) {
      this.selectSong = this.songListDetailData[index]
      this.$store.commit('musicPlay/actionSheetHideFlag',true) 
    },
  }
}
</script>

<style scoped lang="less">
  .MainListDisplay {
    position: fixed;
    height: 85%;
    width: 100%;
  }
  .songName {
    color: #000;
    font-size: 15px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .singer {
    font-size: 12px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .bgColor {
    background-color: #ddd;
  }
  .ItemMsg {
    color: #fff;
    position: relative;
    width: 100%;
  }
  .listDisplayItemMv {
    position: absolute;
    width: 44px;
    height: 44px;
    right: 0;
    top: 0;
    img {
      width: 75%;
      height: 75%;
    }
  }
</style>
