<template>
  <div class="songListItem">
    <div class="songListItemImg">
      <slot name="songListItemImg"></slot>
      <div class="songListItemHeat">
        <slot name="songListItemHeat"></slot>
      </div>
    </div>
    <div class="SongListItemTitle">
      <slot name="SongListItemTitle"></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped>
  .songListItem {
    display: flex;
    flex-direction: column;
    margin-right: 5%;
  }
  .songListItemImg {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    position: relative;
  }
  
  .SongListItemTitle {
    font-size: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    letter-spacing: 0.5px;
  }
  .songListItemHeat {
    position: absolute;
    top: 5%;
    right: 5%;
    width: 45%;
    height: 20%;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, .3);
    font-size: 9px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 2%;
    letter-spacing: 0.5px;
  }
</style>
