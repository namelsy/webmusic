<template>
  <div class="tab-nav">
		<div class="nav-left"><slot name="nav-left"></slot></div>
		<div class="nav-center"><slot name="nav-center"></slot></div>
		<div class="nav-right"><slot name="nav-right"></slot></div>
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
  .tab-nav {
		height: 44px;
		line-height: 44px;
		display: flex;
		text-align: center;
		.nav-left, .nav-right{
			width: 44px;
			height: 44px;
			display: flex;
			justify-content: center;
			align-items: center;
      :nth-child(1) {
        width: 65%;
        height: 65%;
      }
		}
    
		.nav-center {
			flex: .99;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
</style>
