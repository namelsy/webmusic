<template>
  <list-display>
    <list-display-item v-for="(item,index) in songListDetailData" :key="item.id" @click="songDetail(item.id)" :class="{bgColor:index == currentIndex}">
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
        <img src="~assets/images/icon/share/playerGray.png" alt="">
      </template>
      <template #listDisplayItemMore>
        <img src="~assets/images/icon/share/moreGray.png" alt="" @click.stop="ActionSheetShow(index)">
      </template>
    </list-display-item>
  </list-display>
  <action-sheet @selectSong="selectSong"></action-sheet>
</template>

<script type="text/ecmascript-6">
import ListDisplay from '@/components/content/listDisplay/ListDisplay'
import ListDisplayItem from '@/components/content/listDisplay/ListDisplay'
import ActionSheet from '@/components/content/actionSheet/ActionSheet'                    

import {player,songDetail} from "network/detail"
import { mapGetters,mapState } from 'vuex'
import { ref } from 'vue';
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
    songDetail(id) {
      // let idArray = this.songListDetailData.reduce((total,val) => {
      //   return total !=0 ? total + ',' + val.id : val.id
      // },0)

      //查找指定ID的索引
      let list = this.songListDetailData
      let playIndex = (list || []).findIndex((songListDetailData) => songListDetailData.id === id)
      songDetail(id).then(res => {
        this.$store.commit('musicPlay/Cutover', true);
        this.$store.dispatch('musicPlay/addAllPlay',{list,playIndex}) 
        this.$store.commit('musicPlay/playViewHideFlag',true) 
      })
    },
    ActionSheetShow(index) {
      this.selectSong = this.songListDetailData[index]
      this.$store.commit('musicPlay/actionSheetHideFlag',true) 
        
    },
  }
}
</script>

<style scoped lang="less">
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
</style>
