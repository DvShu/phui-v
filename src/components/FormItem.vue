<template>
  <div
    class="ph-form-item"
    :class="{
      'is-required': validInfo && validInfo.required,
      'is-error': errors != null && errors?.has(name || ''),
    }"
  >
    <label
      v-if="label != null"
      class="ph-form-label"
      :style="{ width: labelWidth + 'px' }"
      >{{ label }}</label
    >
    <div
      class="ph-form__content"
      :style="{ 'margin-left': (label == null ? labelWidth : 0) + 'px' }"
    >
      <slot></slot>
      <transition name="ph-trans-base">
        <span
          v-if="errors != null && errors.has(name || '')"
          class="ph-form-item__error"
        >
          {{ errors.get(name || '') }}
        </span>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, provide } from 'vue';
import {
  formItemInfo,
  formItemValidFunc,
  formValidError,
  formValidKeyFunc,
  formValidTrigger,
} from './types';

interface FormItemProps {
  /** 标签 */
  label?: string;
  /** 标签文本宽度 */
  labelWidth?: number;
  /** 在进行表单验证时，对应数据验证的 key */
  name?: string;
}

const props = withDefaults(defineProps<FormItemProps>(), {
  labelWidth: 80,
});

/** 验证的错误信息 */
const errors = inject<Map<string, string>>(formValidError);
// 获取验证信息
const formItemValidInfo =
  inject<(name?: string) => { required: boolean; trigger: string }>(
    formItemInfo
  );
let validInfo: { required: boolean; trigger: string } | null = null;
if (formItemValidInfo != null) {
  validInfo = formItemValidInfo(props.name);
}
// 提供数据验证时机，供 PhInput 获取使用
if (validInfo != null) {
  provide(formValidTrigger, validInfo.trigger);
}
// 获取数据验证器
const formValid = inject<(key: string) => void>(formValidKeyFunc);
/** 验证数据, 供 PhInput 使用 */
function validData(name?: string) {
  if (validInfo != null && formValid != null) {
    if (name == null || name == '' || name === props.name) {
      formValid(props.name || '');
    }
  }
}
provide(formItemValidFunc, validData);
</script>
