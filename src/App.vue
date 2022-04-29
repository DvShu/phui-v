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
  InputNumber,
  Input as UiInput,
} from './components';
import { ref, reactive, onMounted } from 'vue';
import type { RuleType } from 'ph-utils/lib/validator_m';

const rules: RuleType[] = [{ rule: 'required', message: '请输入用户名' }];

const num = ref(1);
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
  <p>输入框</p>
  <div>
    <InputNumber :min="1" :max="10"></InputNumber>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
