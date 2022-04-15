<template>
  <div class="ph-input-number">
    <span class="ph-input-number__decrease" @click="updateNumber('decrease')"
      >-</span
    >
    <Input type="positive-int" v-model="inputData"></Input>
    <span class="ph-input-number__increase" @click="updateNumber('increase')"
      >+</span
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Input from './Input.vue';
import { isBlank } from 'ph-utils/lib/index_m';

const props = defineProps<{
  /** 允许通过 v-model 绑定数据 */
  modelValue?: number;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
}>();

const emits = defineEmits(['update:modelValue']);

// 输入框的值
const inputData = ref(props.modelValue != null ? String(props.modelValue) : '');

function compareMinMax(n: number) {
  if (props.min != null) {
    if (n < props.min) {
      n = props.min;
    }
  }
  if (props.max != null) {
    if (n > props.max) {
      n = props.max;
    }
  }
  return n;
}

// 监听输入框的值改变
watch(inputData, (v) => {
  let n = 1;
  if (!isBlank(v)) {
    n = Number(v);
    n = compareMinMax(n);
  }
  emits('update:modelValue', n);
});

watch(
  () => props.modelValue,
  (v) => {
    let numberStr = v == null ? '' : String(v);
    if (numberStr !== inputData.value) {
      inputData.value = numberStr;
    }
  }
);

function updateNumber(action: 'decrease' | 'increase') {
  let n = props.modelValue == null ? 1 : props.modelValue;
  if (action === 'decrease') {
    n--;
  } else {
    n++;
  }
  n = compareMinMax(n);
  inputData.value = String(Math.abs(n));
  emits('update:modelValue', n);
}
</script>

<style lang="less"></style>
