<script setup lang="ts">
import { ref } from 'vue';
import { InputNumber, Tabbar, Button } from './components';

const n = ref(1);

const t = ref('a');
</script>

<template>
  <InputNumber v-model="n" :min="1" :max="10"></InputNumber>
  <Tabbar
    :tabs="[
      { name: 'a', text: 'Tab1' },
      { name: 'b', text: 'Tab2' },
      { name: 'c', text: 'Tab3' },
    ]"
    :type="'buttons'"
    v-model="t"
  ></Tabbar>
  <Button>默认按钮</Button>
</template>

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
