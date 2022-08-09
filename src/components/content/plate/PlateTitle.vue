<template>
  <div class="plateTitle">
    <div class="plateTitleLeft">
      <slot name="plateTitleLeft"></slot>
    </div>
    <div class="plateTitleRight">
      <slot name="plateTitleRight"></slot>
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
  .plateTitle {
    width: 90%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
  }
  .plateTitleLeft {
    font-size: 18px;
    color: #111;
    font-weight: 600;
  }
  .plateTitleRight {
    border: 1px solid #999;
    border-radius: 30px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items:center;
    font-size: 14px;
  }
</style>
