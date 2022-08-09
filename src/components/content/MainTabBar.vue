<template>
  <tab-bar>
		<tab-bar-item path="/home">
			<template #item-icon>
				<img src="~assets/images/tabBar/icon01.png" alt="">
			</template>
			<template #item-icon-active>
				<img src="~assets/images/tabBar/icon01_active.png" alt="">
			</template>
			<template #item-text>
				<div>主页</div>
			</template>
		</tab-bar-item>
		<tab-bar-item path="/video">
			<template #item-icon>
				<img src="~assets/images/tabBar/icon02.png" alt="">
			</template>
			<template #item-icon-active>
				<img src="~assets/images/tabBar/icon02_active.png" alt="">
			</template>
			<template #item-text>
				<div>视频</div>
			</template>
		</tab-bar-item>
		<tab-bar-item path="contact">
			<template #item-icon>
				<img src="~assets/images/tabBar/icon03.png" alt="">
			</template>
			<template #item-icon-active>
				<img src="~assets/images/tabBar/icon03_active.png" alt="">
			</template>
			<template #item-text>
				<div>交流</div>
			</template>
		</tab-bar-item>
		<tab-bar-item path="/personal">
			<template #item-icon>
				<img src="~assets/images/tabBar/icon04.png" alt="">
			</template>
			<template #item-icon-active>
				<img src="~assets/images/tabBar/icon04_active.png" alt="">
			</template>
			<template #item-text>
				<div>我的</div>
			</template>
		</tab-bar-item>
	</tab-bar>
</template>

<script type="text/ecmascript-6">
  import TabBar from "components/common/tabBar/TabBar"
	import TabBarItem from "components/common/tabBar/TabBarItem"
	export default {
		name: 'MainTabBar',
		components: {
			TabBar,
			TabBarItem
		}
	}
</script>

<style scoped>
</style>
