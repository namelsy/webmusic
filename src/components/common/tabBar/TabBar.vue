<template>
  <div class="tab-bar-wrap">
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
  .tab-bar-wrap {
		font-size: 12px;
		height: 49px;
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #f2f2f2;
		box-shadow: 2px 2px 10px  #ececec;
	}
</style>
