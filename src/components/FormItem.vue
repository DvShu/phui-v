<template>
  <div class="ph-form-item">
    <label
      v-if="!isBlank(label)"
      class="ph-form-label"
      :style="{ width: labelWidth + 'px' }"
      >{{ label }}</label
    >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { isBlank } from 'ph-utils/lib/index_m';

interface FormItemProps {
  /** 标签 */
  label?: string;
  /** 标签文本宽度 */
  labelWidth?: number;
}

withDefaults(defineProps<FormItemProps>(), {
  label: '',
  labelWidth: 60,
});
</script>
