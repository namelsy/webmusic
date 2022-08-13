<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <keep-alive exclude="SongListDetail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <MainTabBar v-if="$route.meta.tabBar"></MainTabBar>
  </div>
</template>

<script type="text/ecmascript-6">
import MainTabBar from './components/content/MainTabBar'
import Player from './components/content/player/Player'
export default {
  data() {
    return {

    }
  },
  components: {
    MainTabBar,
    Player,
  },
  computed: {
    playerBottom(){
				return this.$route.meta.tabBar ? {bottom: '50px'} : {}
			}
  }
}
</script>

<style scoped>
  #app {
    width: 100vw;
    height: 100vh;
  }
</style>
