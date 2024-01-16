<template>
  <label v-if="label" :for="name">{{ label }}</label>
  <input
    :list="name + '-list'"
    :id="name"
    :name="name"
    class="ph-input"
    :placeholder="placeholder"
  />

  <datalist :id="name + '-list'">
    <option value="Chocolate1">Chocolate</option>
    <option value="Coconut">Coconut</option>
    <option value="Mint">Mint</option>
    <option value="Strawberry">Strawberry</option>
    <option value="Vanilla">Vanilla</option>
  </datalist>
</template>

<script setup lang="ts">
import { random } from "ph-utils";

withDefaults(
  defineProps<{
    label?: string;
    /** id, 建议手动设置，否则有可能会重复 */
    name?: string;
    placeholder?: string;
  }>(),
  {
    name: `datalist-${Date.now() % 1000}-${random(2)}`,
    placeholder: "请选择",
  }
);
</script>

<style lang="less"></style>
