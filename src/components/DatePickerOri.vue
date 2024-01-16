<template>
  <input
    :value="modelValue"
    type="date"
    class="ph-input ph-date-picker-ori"
    :max="maxDate"
    :min="minDate"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
import { format } from "ph-utils/date";
const props = withDefaults(
  defineProps<{
    modelValue: string;
    minDate?: string;
    maxDate?: string;
    /** 默认值, 通常用于清除时, 使用默认值 */
    defaultValue?: string;
    /** 是否允许为空 */
    isNull?: boolean;
  }>(),
  {
    minDate: "",
    maxDate: "",
    isNull: false,
  }
);

const emits = defineEmits(["update:modelValue"]);

function handleChange(e: Event) {
  let value = (e.target as HTMLInputElement).value;
  if (value == null || value === "") {
    if (!props.isNull) {
      value =
        props.defaultValue == null
          ? format(new Date(), "yyyy-mm-dd")
          : props.defaultValue;
    }
  }
  emits("update:modelValue", value);
}
</script>
