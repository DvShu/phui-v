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
  Message,
  Switch,
  Tabbar,
} from './components';
import { ref, reactive } from 'vue';

const swt = ref(false);

const tabs = [
  { name: 'tab1', text: '选项卡一' },
  { name: 'tab2', text: '选项卡二' },
  { name: 'tab3', text: '选项卡三' },
  { name: 'tab4', text: '选项卡四' },
  { name: 'tab5', text: '选项卡五' },
];

const tab = reactive(new Set<string>(['tab1', 'tab3']));

/** 监听选项卡的改变事件 */
function tabChange(name: string) {
  if (tab.has(name)) {
    console.log('delete: ' + name);
    tab.delete(name);
    console.log(tab);
  } else {
    if (name === 'tab1' || name === 'tab2') {
      tab.delete(name === 'tab1' ? 'tab2' : 'tab1');
    }
    tab.add(name);
  }
}
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
  <p>开关</p>
  <div>
    <Switch v-model="swt"></Switch>
  </div>
  <p>选项卡</p>
  <div>
    <Tabbar
      v-model="tab"
      :tabs="tabs"
      type="buttons"
      :multi-select="true"
      @change="tabChange"
      :custom-change="true"
    ></Tabbar>
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
