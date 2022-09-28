<template>
  <div class="ph-input-number">
    <span class="ph-input-number__decrease" @click="updateNumber('decrease')"
      >-</span
    >
    <Input
      type="positive-int"
      v-model="inputData"
      autocomplete="off"
      :name="name"
      :min="props.min"
      :max="props.max"
      @update:model-value="updateModelValue"
    ></Input>
    <span class="ph-input-number__increase" @click="updateNumber('increase')"
      >+</span
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Input from './Input.vue';

const props = defineProps<{
  /** 允许通过 v-model 绑定数据 */
  modelValue?: number;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  name?: string;
}>();

const emits = defineEmits(['update:modelValue']);

// 输入框的值
const inputData = ref(props.modelValue);

watch(
  () => props.modelValue,
  (v) => {
    inputData.value = v;
  }
);

function updateModelValue(v: number) {
  emits('update:modelValue', v);
}

function updateNumber(action: 'decrease' | 'increase') {
  let n = inputData.value == null ? 1 : Number(inputData.value);
  if (action === 'decrease') {
    n--;
  } else {
    n++;
  }
  inputData.value = n;
  emits('update:modelValue', n);
}
</script>

<style lang="less"></style>
