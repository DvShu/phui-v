<template>
  <form class="ph-form" autocomplete="on" @submit.prevent="submit">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { provide, onUnmounted, reactive, ref, toRaw } from 'vue';
import Validator, { RuleType, SchemaType } from 'ph-utils/lib/validator_m';
import { formItemInfo, formValidError, formValidKeyFunc } from './types';

const props = withDefaults(
  defineProps<{
    /** 验证规则 */
    rules?: {
      [index: string]: {
        trigger?: 'change' | 'blur';
        rules?: RuleType[];
        required?: boolean;
      };
    };
    /** 表单数据对象 */
    model?: any;
  }>(),
  {
    rules: undefined,
    model: undefined,
  }
);
/** 保存所有的错误 */
let errors = reactive(new Map<string, string>());

let validator: Validator | null = null;
if (props.rules != null) {
  let schemas: SchemaType[] = [];
  for (let key in props.rules) {
    schemas.push({
      key,
      rules: props.rules[key].rules || [],
      required: props.rules[key].required,
    });
  }
  validator = new Validator(schemas);
}

/** 获取对应字段的验证信息 */
function getValidInfo(name?: string) {
  let r = null;
  if (
    name != null &&
    props.rules != null &&
    Object.prototype.hasOwnProperty.call(props.rules, name)
  ) {
    r = {
      required: props.rules[name].required || false,
      trigger: props.rules[name].trigger || 'change',
    };
  }
  return r;
}

/** 验证单一字段的数据 */
function validKey(key: string) {
  if (validator != null && props.model != null) {
    validator
      .validateKey(key, props.model[key], props.model)
      .then(() => {
        errors.delete(key);
      })
      .catch((err) => {
        errors.set(err.key, err.message);
      });
  }
}

/** 重置表单错误 */
function resetErrors() {
  errors.clear();
}

/** 验证数据 */
function validate() {
  if (validator != null) {
    return validator.validate(props.model);
  } else {
    return Promise.resolve(true);
  }
}

// 注册获取验证信息的方法，供 FormItem 组件使用
provide(formItemInfo, getValidInfo);
// 注入验证单一字段的函数，供 FormItem 组件使用
provide(formValidKeyFunc, validKey);
/** 验证的错误 */
provide(formValidError, errors);

const emit = defineEmits(['submit']);

function submit() {
  validate()
    .then(() => {
      errors.clear();
      emit('submit');
    })
    .catch((err) => {
      errors.clear();
      errors.set(err.key, err.message);
    });
}

onUnmounted(() => {
  validator = null;
  errors.clear();
  (errors as any) = null;
});

defineExpose({ resetErrors });
</script>
