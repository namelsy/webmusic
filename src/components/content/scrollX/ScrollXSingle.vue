<template>
  <div class="scroll-item">
		<div><slot name="item-icon"></slot></div>
		<div><slot name="item-text"></slot></div>
	</div>
</template>

<script type="text/ecmascript-6">
import ScrollX from 'components/content/scrollX/ScrollX'
export default {
  data() {
    return {

    }
  },
  components: {
    ScrollX
  }
}
</script>

<style scoped lang="less">
.tab-bar-item {
		flex: 1;
		text-align: center;
		img {
			width: 22px;
			height: 22px;
			margin: 4px 0;
			vertical-align: middle;
		}
	}
</style>
