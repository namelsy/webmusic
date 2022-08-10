<template>
  <plate>
    <!-- 板块标题 -->
    <template #plateTitle>
      <plate-title>
        <template #plateTitleLeft  class="plateTitleLeft">推荐歌单</template>
        <template #plateTitleRight>更多</template>
      </plate-title>
    </template>
    <!-- 板块列表 -->
    <template #plateList>
      <plate-list-one>
          <plate-list-one-item v-for="item in songlistData" @click="jumpSongListDetail(item.id)"> 
            <template #songListItemImg>
              <img :src="item.picUrl">
             </template>
            <template #songListItemHeat>
              {{item.playCount}}
            </template>
            <template #SongListItemTitle>
              {{item.name}}
            </template>
          </plate-list-one-item>
      </plate-list-one>
    </template>

  </plate>
  
</template>

<script type="text/ecmascript-6">
import Plate from '@/components/content/plate/Plate'
import PlateTitle from '@/components/content/plate/PlateTitle'
import PlateListOne from '@/components/content/plate/PlateListOne'
import PlateListOneItem from '@/components/content/plate/PlateListOneItem'
export default {
  data() {
    return {
    }
  },
  components: {
    Plate,
    PlateTitle,
    PlateListOne,
    PlateListOneItem
  },
  props: {
    songlistData: {
      type:Array,
      default() {
        return []
      }
    },
  },
  computed: {
  },
  mounted() {

      // this.songlistDataSon = songlistData
  },
  methods: {
    jumpSongListDetail(id) {
      this.$router.push('/songListDetail/' + id)
    }
  }
}
</script>

<style scoped>
  .plateTitleLeft {
    font-size: 16px;
    color: #111;
  }
  .songListItemImg img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
</style>
