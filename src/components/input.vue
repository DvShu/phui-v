<template>
  <div class="ph-input_wrapper" :class="[tip === '' ? '' : 'ph-input-error']">
    <input
      v-model="inputData"
      :type="type === 'positive-int' ? 'text' : type"
      class="ph-input"
      @input="inputText"
      @blur="blur"
      :name="name"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
    />
    <span v-if="tip !== ''" class="ph-input-error-tip">{{ tip }}</span>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, onUnmounted, watch, toRef } from 'vue';
import Validator, { RuleType } from 'ph-utils/lib/validator_m';
import { FormRegistInput, validatorKey, formRegistKey } from './types';

interface FormItemProps {
  /** 标签 */
  type?: 'text' | 'positive-int';
  /** 原生属性 */
  name?: string;
  /** 原生属性 */
  placeholder?: string;
  /** 进行数据验证的方式, change - 输入改变时验证, blur - 失去焦点时验证 */
  trigger?: 'change' | 'blur';
  rules?: RuleType[];
  modelValue?: string | number;
  autocomplete?: 'on' | 'off';
  /** 最小值，当 type 为 positive-int 时有效 */
  min?: number;
  /** 最大值，当 type 为 positive-int 时有效 */
  max?: number;
}
/** 错误提示 */
const tip = ref('');
const props = withDefaults(defineProps<FormItemProps>(), {
  type: 'text',
  name: '',
  placeholder: '',
  trigger: 'change',
  autocomplete: 'on',
});
const emit = defineEmits(['update:modelValue']);
/** 输入框的值 */
const inputData = ref('');

// 监听主动修改输入框的值
watch(
  () => props.modelValue,
  () => {
    parseModelValue();
  }
);

/** 比较最大最小值 */
function compareMinMax(n: number) {
  if (props.min != null && n < props.min) {
    n = props.min;
  }
  if (props.max != null && n > props.max) {
    n = props.max;
  }
  return n;
}

/** 解析 modelValue 属性值 */
function parseModelValue() {
  let v: string | number = '';
  if (props.modelValue != null) {
    v = props.modelValue;
    if (props.type === 'positive-int') {
      // 比较最大最小
      v = compareMinMax(props.modelValue as number);
      if (v !== props.modelValue) {
        emit('update:modelValue', v);
      }
    }
  }
  inputData.value = String(v);
}

let validator = inject(
  validatorKey,
  props.rules != null && props.name !== ''
    ? new Validator([{ key: props.name, rules: props.rules }])
    : null
);

function error(errMsg?: string) {
  if (errMsg == null || errMsg === '') {
    tip.value = '';
  } else {
    tip.value = errMsg;
  }
}

function isError() {
  return tip.value != null && tip.value !== '';
}

function value() {
  return inputData.value;
}

const regist = inject<((name: string, ipt: FormRegistInput) => void) | null>(
  formRegistKey,
  null
);

if (regist != null) {
  regist(props.name, { error, value, isError });
}

/** 验证数据 */
function validData(v: string) {
  if (validator != null && props.name !== '') {
    validator
      .validateKey(props.name, v)
      .then(() => {
        tip.value = '';
      })
      .catch((err: Error) => {
        tip.value = err.message;
      });
  }
}

/** 输入框输入事件 */
function inputText(e: Event) {
  let $target = e.target as HTMLInputElement;
  let v = $target.value;
  if (props.type === 'positive-int') {
    // 正整数
    let m = v.match(/[1-9]\d*/);
    if (m == null) {
      v = '';
    } else {
      v = m[0];
    }
  }
  if (props.trigger === 'change') {
    validData(v);
  }
  inputData.value = v;
  emit('update:modelValue', props.type === 'positive-int' ? Number(v) : v);
}

/** 输入框失去焦点事件 */
function blur(e: Event) {
  if (props.trigger === 'blur') {
    validData((e.target as HTMLInputElement).value);
  }
}

parseModelValue(); // 解析参数

onUnmounted(() => {
  if (props.rules != null && props.name !== '') {
    validator = null;
  }
});
</script>

<style lang="less"></style>
