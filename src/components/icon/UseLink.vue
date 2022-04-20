<template>
  <PhIcon :use-link="true">
    <use :xlink:href="`#${prefix}${type}`"></use>
  </PhIcon>
</template>

<script setup lang="ts">
import PhIcon from './index.vue';

withDefaults(
  defineProps<{
    /** icon 类型 */
    type: string;
    /** 图标前缀名称 */
    prefix?: string;
  }>(),
  {
    prefix: 'icon-',
  }
);
</script>
