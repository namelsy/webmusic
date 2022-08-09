<template>
  <div class="controlBar">
    <div class="controlBarIcon"><img src="~assets/images/icon/share/playIcon.png" alt=""></div>
    <div class="controlBarTitle">
      <div>播放全部</div><span> ()</span>
      
    </div>
    <div class="controlBarDownload"><img src="~assets/images/icon/share/downloadIcon.png" alt=""></div>
    <div class="controlBarChoice"><img src="~assets/images/icon/share/choiceIcon.png" alt=""></div>
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

<style scoped lang="less">
  .controlBar {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: #fff;
  }
  .controlBarTitle {
    flex: 1;
    font-size: 16px;
    font-weight: 600;
    color: #000;
    display: flex;
    align-items: center;
    span {
      color: #888;
      font-size: 15px;
      line-height: 16px;
      display: inline-block;
      margin-left: 5px;
      letter-spacing: 2px;
    }
  }
  .controlBarIcon {
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 60%;
      height: 60%;
    }
  }

  .controlBarDownload {
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 60%;
      height: 60%;
    }
  }

  .controlBarChoice {
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 60%;
      height: 60%;
    }
  }
</style>
