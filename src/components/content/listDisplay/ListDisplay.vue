<template>
  <ul class="listDisplay">
    <slot></slot>
  </ul>
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
  .listDisplay {
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    /* height: calc(100vh - 50px - 44px  - 60px); */
    height: 100%;
    >:last-child {
       margin-bottom: 46px;
    }
  }
</style>
