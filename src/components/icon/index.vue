<template>
  <svg
    :viewBox="!useLink ? '0 0 1024 1024' : undefined"
    aria-hidden="true"
    class="ph-icon"
  >
    <slot></slot>
  </svg>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    useLink?: boolean;
  }>(),
  {
    useLink: false,
  }
);
</script>
