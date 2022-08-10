<template>
  <div class="">
    <!-- 导航栏 -->
    <nav-bar>
      <template #nav-left> 
        <img src="~assets/images/icon/share/set.png" alt="">
      </template>
      <template #nav-center>
        <van-search
          v-model="searchValue"
          shape="round"
          @search="onSearch"
          placeholder="请输入搜索关键词"
        />
			</template>
      <template #nav-right> 
          <img src="~assets/images/icon/share/tgsq.png" alt="">
      </template>
    </nav-bar>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in swiperArray" :key="item.encodeId">
          <img :src="item.imageUrl" alt="">
        </van-swipe-item>
    </van-swipe>
    <!--  -->
    <!-- <scroll-x-list-one></scroll-x-list-one> -->
    <!-- 推荐歌单 -->
    <song-list-plate :songlistData="songlistData"></song-list-plate>
    <recommended-songs></recommended-songs>
  </div>
</template>

<script type="text/ecmascript-6">
import NavBar from '@/components/common/navBar/NavBar.vue'
// import ScrollXListOne from './homeChild/ScrollXListOne'
import SongListPlate from './homeChild/SongListPlate'
import RecommendedSongs from './homeChild/RecommendedSongs'

import {search} from "network/detail";
import {getBannerData,recommendedSonglist,recommendedData} from "network/home"
export default {
  data() {
    return {
      searchValue: '',
      swiperArray: [],
      songlistData: [],
    }
  },
  components: {
    NavBar,
    // ScrollXListOne,
    SongListPlate,
    RecommendedSongs,

  },
  inject: ['$cookies'],//引用全局的cookies
  created() {
    this.recommendedData()
    this.getBannerData()
    this.recommendedSonglist()
  },
  methods: {
      //接口获取数据
    onSearch(value) {
      console(value) 
      searchValue = this.searchValue
      search(searchValue,limit).then(res => {
      })
    },
    // 获取轮播图数据
    getBannerData() {
      // 0 PC// 1 android// 2 iphone// 3 ipad 
      let type = 0
      getBannerData(type).then(res=>{
        if(res.data.code == 200) {
          let swiperArray = res.data.banners
          this.swiperArray = swiperArray
        }
      })
    },

    //获取推荐歌单数据
    recommendedSonglist() {
      let limit=6
      recommendedSonglist(limit).then(res=> {
        if(res.data.code == 200) {
          let songlistData = res.data.result
          for(var i in songlistData) {
            songlistData[i].playCount = songlistData[i].playCount.toString()
            if(songlistData[i].playCount.length > 4) {
              songlistData[i].playCount = songlistData[i].playCount.slice(0,length-4) + '万'
            }
          }
          this.songlistData = songlistData
          
        }
      })
    },

    recommendedData() {
      if(localStorage.getItem('loginData') == true) {
        let loginData = localStorage.getItem('loginData')
        loginData = JSON.parse(loginData)
        let cookie = loginData.cookie
        let limit = 12
        recommendedData(cookie,limit).then(res=> {
        })
      }
      
      
    }





  },
  
}
</script>

<style scoped>
  .tab-nav {
    background-color: #fff;
  }
  .van-search {
    padding: 0;
    padding-top: 5px;
  }
  .my-swipe {
    height: 160px;
    margin: 10px auto 10px auto;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #fff;
  }
  .van-swipe-item img {
    width: 90%;
    height: 100%;
    border-radius: 15px;

  }
</style>
