<script setup lang="ts">
import {
  LoadingIcon,
  ArrowDownIcon,
  InfoIcon,
  TimeIcon,
  WarnIcon,
  CloseIcon,
  ErrorIcon,
  SuccessIcon,
  Form as PhForm,
  FormItem as PhFormItem,
  Button as PhButton,
  Input as PhInput,
  InputNumber,
  type FormInstance,
} from './components';
import { reactive, toRaw, ref } from 'vue';

const a = ref(1);
</script>

<template>
  <p>图标</p>
  <div>
    <LoadingIcon></LoadingIcon>
    <ArrowDownIcon></ArrowDownIcon>
    <InfoIcon></InfoIcon>
    <TimeIcon></TimeIcon>
    <WarnIcon></WarnIcon>
    <CloseIcon></CloseIcon>
    <ErrorIcon></ErrorIcon>
    <SuccessIcon></SuccessIcon>
  </div>
  <p>表单</p>
  <div>
    <InputNumber v-model="a"></InputNumber>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.demo-form {
  width: 300px;
}
</style>
