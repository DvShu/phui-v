<template>
  <div :class="['ph-triangle', `ph-triangle-${direction}`]"></div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    direction: "top" | "right" | "bottom" | "left";
  }>(),
  {
    direction: "top",
  }
);
</script>

<style lang="less"></style>
