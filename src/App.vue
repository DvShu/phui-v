<script setup lang="ts">
import { ref } from 'vue';
import { Input as PhInput } from './components';

const n = ref(1);

const t = ref('a');

function blur() {
  console.log('失去焦点');
}
</script>

<template><PhInput placeholder="请输入用户命" @blur="blur"></PhInput></template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
