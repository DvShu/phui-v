<script setup lang="ts">
import { ref } from 'vue';
import {
  LoadingIcon,
  ArrowDownIcon,
  InfoIcon,
  TimeIcon,
  WarnIcon,
  CloseIcon,
  ErrorIcon,
  SuccessIcon,
} from './components';
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
