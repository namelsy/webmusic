<template>
  <li class="listDisplayItem">
    <div v-if="1" class="listDisplayItemNum">
      <slot name="listDisplayItemNow"></slot>
    </div>
    <div v-else class="listDisplayItemNum">
      <slot name="listDisplayItemNum"></slot>
    </div>
    <div class="listDisplayItemMsg">
      <slot name="listDisplayItemMsg"></slot>
    </div>
    <div class="listDisplayItemMore">
      <slot name="listDisplayItemMore"></slot>
    </div>
  </li>
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
  .listDisplayItem {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    .listDisplayItemMsg {
      height: 50px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      text-overflow: ellipsis;
      // width: calc(100% - 100px);
    }
    .listDisplayItemNum, .listDisplayItemMore{
      width: 50px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #777;
      :nth-child(1) {
        width: 60%;
        height: 60%;
      }
    }
  }
</style>
