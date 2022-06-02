<template>
  <div class="ph-virtual-scroller">
    <div class="ph-virtual-scroller__item-wrapper" :style="{ 'min-height': totalSize + 'px' }">
      <div
        v-for="(item, index) in datas"
        :key="keyField === 'index' ? index : item[keyField]"
        class="ph-virtual-scroller__item"
        :style="{ transform: `translateY(${itemSize}px)` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';

const props = withDefaults(
  defineProps<{
    /** 列表数据 */
    items: Object[];
    /** 列表组件 key */
    keyField?: string;
    /** 列表项的高度 */
    itemSize: number;
  }>(),
  {
    keyField: 'index',
  }
);

/** 渲染的数据列表 */
const datas = reactive<any[]>([]);
/** 容器高度 */
const totalSize = computed(() => props.items.length * props.itemSize);
</script>

<style lang="less">
.ph-virtual-scroller {
  position: relative;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  .ph-virtual-scroller__item {
    position: absolute;
    top: 0;
    left: 0;
  }
}
.ph-virtual-scroller__item-wrapper {
  position: relative;
  overflow: hidden;
}
</style>
