<template>
  <div class="scroll">
    <slot></slot>
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
  .scroll {
    overflow-x: scroll;
  }
</style>
