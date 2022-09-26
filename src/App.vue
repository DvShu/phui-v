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
  Carousel,
} from "./components"
import { reactive, toRaw, ref, onMounted } from "vue"

const a = ref(1)
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
  <p>轮播图</p>
  <div class="carousel-panel">
    <Carousel>
      <div class="swipe-item1">1</div>
      <div class="swipe-item2">2</div>
      <div class="swipe-item3">3</div>
      <div class="swipe-item4">4</div>
    </Carousel>
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

.carousel-panel {
  height: 200px;
  border: 1px solid #dedede;
}

.carousel-panel .swipe-item1 {
  background-color: #0089dc;
  color: #fff;
}

.carousel-panel .swipe-item2 {
  background-color: #ffd705;
  color: #fff;
}

.carousel-panel .swipe-item3 {
  background-color: red;
  color: #fff;
}

.carousel-panel .swipe-item4 {
  background-color: yellowgreen;
  color: #fff;
}

.carousel-panel .ph-carousel-item {
  font-size: 18px;
  text-align: center;
  line-height: 200px;
}
</style>
