<template>
  <input
    ref="inputEl"
    v-model="inputData"
    :type="type === 'positive-int' ? 'text' : type"
    class="ph-input"
    @input="inputText"
    @blur="blur"
    :name="name"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
  />
</template>

<script setup lang="ts">
import { inject, ref, watch } from "vue";
import { formValidTrigger, formItemValidFunc } from "./types";

/** input 输入框 */
const inputEl = ref();

interface FormItemProps {
  /** 标签 */
  type?: string;
  /** 原生属性 */
  name?: string;
  /** 原生属性 */
  placeholder?: string;
  modelValue?: string | number;
  autocomplete?: "on" | "off";
  /** 最小值，当 type 为 positive-int 时有效 */
  min?: number;
  /** 最大值，当 type 为 positive-int 时有效 */
  max?: number;
}
const props = withDefaults(defineProps<FormItemProps>(), {
  type: "text",
  name: "",
  placeholder: "",
  autocomplete: "on",
});
const emit = defineEmits(["update:modelValue"]);
/** 输入框的值 */
const inputData = ref("");
/** 数据验证时机 */
const trigger = inject<string>(formValidTrigger, "");
/** 数据验证器 */
const validData = inject<((name?: string) => void) | null>(
  formItemValidFunc,
  null
);

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
  let v: string | number = "";
  if (props.modelValue != null) {
    v = props.modelValue;
    if (props.type === "positive-int") {
      // 比较最大最小
      v = compareMinMax(props.modelValue as number);
      if (v !== props.modelValue) {
        emit("update:modelValue", v);
      }
    }
  }
  inputData.value = String(v);
}

/** 输入框输入事件 */
function inputText(e: Event) {
  let $target = e.target as HTMLInputElement;
  let v = $target.value;
  if (props.type === "positive-int") {
    // 正整数
    let m = v.match(/[1-9]\d*/);
    if (m == null) {
      v = "";
    } else {
      v = m[0];
    }
  }
  inputData.value = v;
  emit("update:modelValue", props.type === "positive-int" ? Number(v) : v);
  if (trigger === "change" && validData != null) {
    validData($target.name);
  }
}

/** 输入框失去焦点事件 */
function blur(e: Event) {
  if (trigger === "blur" && validData != null) {
    validData((e.target as HTMLInputElement).name);
  }
}

parseModelValue(); // 解析参数

/** 获取焦点 */
function focus() {
  if (inputEl.value != null) {
    inputEl.value.focus();
  }
}

defineExpose({
  focus,
});
</script>

<style lang="less"></style>
