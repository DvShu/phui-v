<template>
  <div
    class="ph-switch"
    :class="{ 'ph-switch--on': isOn }"
    :style="{ fontSize: size + 'px' }"
    @click="toggleSwitch"
  >
    <div class="ph-switch-action"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOn = ref(false);
const props = withDefaults(
  defineProps<{
    size?: number;
  }>(),
  {
    size: 30,
  }
);

const emits = defineEmits(['change']);

function toggleSwitch() {
  isOn.value = !isOn.value;
  emits('change', isOn.value);
}
</script>
