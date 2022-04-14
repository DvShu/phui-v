<template>
  <button
    :class="[
      'ph-btn',
      type ? 'ph-btn-' + type : '',
      block ? 'ph-btn-block' : '',
      round ? 'ph-btn-round' : '',
      circle ? 'ph-btn-circle' : '',
      loading ? 'ph-btn-loading' : '',
    ]"
    :disabled="disabled || loading"
    :type="(htmlType as any)"
  >
    <template v-if="loading">
      <LoadingIcon></LoadingIcon>
      <span>{{ loadingText }}</span>
    </template>
    <span v-else><slot></slot></span>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import LoadingIcon from './icon/Loading.vue';

export default defineComponent({
  name: 'PhButton',
  components: {
    LoadingIcon,
  },
  props: {
    /**
     * 设置按钮类型；primary, text, normal
     */
    type: {
      type: String as PropType<'primary' | 'text' | 'normal'>,
      required: false,
      default: 'normal',
    },
    /** 是否禁用状态 */
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    /** 原生的 type 属性 */
    htmlType: {
      type: String,
      required: false,
      default: 'button',
    },
    /** 按钮是否适合其父宽度(宽度100%) */
    block: {
      type: Boolean,
      required: false,
      default: false,
    },
    /** 是否是圆形按钮 */
    circle: {
      type: Boolean,
      required: false,
      default: false,
    },
    /** 是否是弧形按钮 */
    round: {
      type: Boolean,
      required: false,
      default: false,
    },
    /** 加载的时候显示的文本 */
    loadingText: {
      type: String,
      required: false,
      default: '加载中……',
    },
    /** 是否处于加载状态 */
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>
