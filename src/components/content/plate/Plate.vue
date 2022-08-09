<template>
  <div class="plate">
    <slot name="plateTitle"></slot>
    <slot name="plateList"></slot>
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
  .plate {
    background-color: #fff;
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
</style>
