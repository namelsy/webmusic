<template>
      <div class="plateListOne">
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
  .plateListOne {
    overflow-x: scroll;
    overflow-y: hidden;
    padding-left: 5%;
    display: flex;
    flex-direction: row;
    height: 140px;
  }
  .plateListOne::-webkit-scrollbar {
  display: none;
}
  
</style>
