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
  Message,
  Triangle,
  DataList,
  DatePickerOri,
  Search,
} from "./";
import { reactive, toRaw, ref, onMounted } from "vue";

const a = ref(1);

const selectedDate = ref("2024-01-16");

onMounted(() => {
  Message.error("错误拉");
});
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
    <select class="ph-input">
      <option>选项一</option>
      <option value="2">选项二</option>
    </select>
    <DataList></DataList>
    <DatePickerOri v-model="selectedDate"></DatePickerOri>
    <Search></Search>
  </div>
  <p>三角形</p>
  <div>
    <Triangle></Triangle>
    <Triangle direction="bottom"></Triangle>
    <Triangle direction="right"></Triangle>
    <Triangle direction="left"></Triangle>
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
.triangle-clip-path {
  width: 20px;
  height: 20px;
  border-top: 20px solid red;
  clip-path: polygon(
    0 0,
    20px 0,
    10px 20px
  ); /* 调整坐标值以改变三角形形状和大小 */
}
</style>
