<template>
  <div
    class="ph-switch"
    :class="{ 'ph-switch--on': modelValue }"
    :style="{ fontSize: size + 'px' }"
    @click="emits('update:modelValue', !modelValue)"
  >
    <div class="ph-switch-action"></div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: number;
    modelValue?: boolean;
  }>(),
  {
    size: 30,
    modelValue: false,
  }
);

const emits = defineEmits(['update:modelValue']);
</script>
