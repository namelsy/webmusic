<template>
  <div class="listDisplay">
    <slot></slot>
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
  .listDisplay {
    padding: 15px 0 45px 0;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 50px - 44px  - 40px);
  }
</style>
