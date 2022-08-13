<template>
      <!-- 导航栏 -->
    <nav-bar>
      <template #nav-left> 
        <img src="~assets/images/icon/share/back.png" alt=""  @click="backClick">
      </template>
      <template #nav-center>
        <div class="navCenter">
          歌单
          <div class="navCenter-right">
            <img src="~assets/images/icon/share/search.png" alt="">
          </div>
        </div>
			</template>
      <template #nav-right> 
          <img src="~assets/images/icon/share/more.png" alt="">
      </template>
    </nav-bar>
    <control-bar></control-bar>
    <main-list-display :songListDetailData="songListDetailData" @onClickSongList="clickSongList"></main-list-display>

     <Player ref="player"></Player>

</template>

<script type="text/ecmascript-6">
import NavBar from '@/components/common/navBar/NavBar.vue'
import ControlBar from './songListDetailChild/ControlBar'
import MainListDisplay from './songListDetailChild/MainListDisplay'
import Player from '@/components/content/player/Player'

import {songListDetail,dynamic} from "network/detail"
import store from '@/store'
export default {
  name: 'SongListDetail',
  data() {
    return {
      id: '',
      songListDetailData: ''
    }
  },
  components: {
    NavBar,
    ControlBar,
    MainListDisplay,
    Player
  },
  created() {
    this.id = this.$route.params.id
    this.songListDetail()
    this.dynamic()
  },
  methods: {
    backClick() {
      this.$router.back()
    },
    songListDetail() {
      let limit = 20
      songListDetail(this.id,limit).then(res => {
        this.songListDetailData = res.data.songs

      })
    },
    dynamic() {
      dynamic(this.id).then(res => {
      })
    },

    clickSongList() {
      this.$refs['player'].queryLyrics()
    }
  }
}
</script>

<style scoped lang="less">
  .tab-nav {
    position: relative;
    background-color: rgba(0, 0, 0, 0);
  }
  .navCenter {
    color: #fff;
    position: relative;
    width: 100%;
  }
  .navCenter-right {
    position: absolute;
    width: 44px;
    height: 100%;
    right: 0;
    top: 0;
    img {
      width: 80%;
      height: 80%;
      padding: 5px;
    }
  }
</style>
