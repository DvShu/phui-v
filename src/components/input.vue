<template>
  <div class="ph-input_wrapper" :class="[tip === '' ? '' : 'ph-input-error']">
    <input
      ref="input"
      type="text"
      class="ph-input"
      :value="modelValue"
      @input="inputText"
      @blur="blur"
      :name="name"
      :placeholder="placeholder"
    />
    <span v-if="tip !== ''" class="ph-input-error-tip">{{ tip }}</span>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, onUnmounted } from 'vue';
import Validator, { RuleType } from 'ph-utils/lib/validator_m';
import { FormRegistInput } from './types';

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
  modelValue?: string;
}
const tip = ref('');
const inputEl = ref<HTMLInputElement>(null as any);
const props = withDefaults(defineProps<FormItemProps>(), {
  type: 'text',
  name: '',
  placeholder: '',
  trigger: 'change',
  rules: undefined,
  modelValue: '',
});
const emit = defineEmits(['update:modelValue']);

let validator = inject(
  'phFormValidator',
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
  return inputEl.value.value;
}

const regist = inject<((name: string, ipt: FormRegistInput) => void) | null>(
  'phFormRegist',
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
    $target.value = v;
  }
  emit('update:modelValue', v);
  validData(v);
}

/** 输入框失去焦点事件 */
function blur(e: Event) {
  if (props.trigger === 'blur') {
    validData((e.target as HTMLInputElement).value);
  }
}

onUnmounted(() => {
  if (props.rules != null && props.name !== '') {
    validator = null;
  }
});
</script>

<style lang="less"></style>
