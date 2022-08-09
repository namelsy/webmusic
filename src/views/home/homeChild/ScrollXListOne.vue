<template>
  <scroll-x>
    <template>
      <scroll-x-single>
        <template #item-icon>
        </template>
        <template #item-text>
          123
        </template>
      </scroll-x-single>
    </template>
  </scroll-x>
</template>

<script type="text/ecmascript-6">
import ScrollX from '@/components/content/scrollX/ScrollX'
import ScrollXSingle from '@/components/content/scrollX/ScrollXSingle.vue';

export default {
  data() {
    return {

    }
  },
  components: {
    ScrollX,
    ScrollXSingle
  }
}
</script>

<style scoped>
</style>
