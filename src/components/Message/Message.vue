<template>
  <transition
    name="ph-message-fade"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :id="id"
      :style="bindStyle"
      :class="['ph-message', `ph-message-${type}`, customClass]"
    >
      <div>
        <component :is="icon" class="ph-message-icon"></component>
        <span class="ph-message-content">{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  PropType,
  ref,
  CSSProperties,
  computed,
  onMounted,
  defineComponent,
} from 'vue';
import ErrorIcon from '../icon/Error.vue';
import InfoIcon from '../icon/Info.vue';
import SuccessIcon from '../icon/Success.vue';
import WarnIcon from '../icon/Warn.vue';

export default defineComponent({
  name: 'PhMessage',
  components: {
    ErrorIcon,
    WarnIcon,
    SuccessIcon,
    InfoIcon,
  },
  props: {
    /** 显示完成，开始关闭时的回调函数 */
    onClose: {
      type: Function as PropType<() => void>,
      required: true,
    },
    /** 显示时间，单位为毫秒。 设为 0 则不会自动关闭，如果不设置，默认为3000 */
    duration: {
      type: Number,
      required: false,
      default: 3000,
    },
    /** 消息类型 */
    type: {
      type: String,
      required: false,
      default: 'info',
    },
    /** 自定义 class */
    customClass: {
      type: String,
      required: false,
      default: '',
    },
    /** z-index */
    zindex: {
      type: Number,
      required: false,
      default: 100,
    },
    /** 偏移量，用于 top */
    offset: {
      type: Number,
      required: false,
      default: 20,
    },
    /** 提示信息 */
    message: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: false,
      default: '',
    },
  },
  // 定义过渡动画完成后的回调
  emits: ['destroy'],
  setup(props) {
    const visible = ref(false); // 是否显示消息

    const bindStyle = computed<CSSProperties>(() => ({
      top: `${props.offset}px`,
      zIndex: props.zindex,
      width: props.width === '' ? undefined : props.width,
    }));

    const icon = computed(() => {
      let iconName = 'InfoIcon';
      if (props.type === 'success') {
        iconName = 'SuccessIcon';
      } else if (props.type === 'warning') {
        iconName = 'WarnIcon';
      } else if (props.type === 'error') {
        iconName = 'ErrorIcon';
      }
      return iconName;
    });

    onMounted(() => {
      visible.value = true;
      if (props.duration > 0) {
        setTimeout(() => {
          visible.value = false;
        }, props.duration);
      }
    });
    return {
      visible,
      bindStyle,
      icon,
    };
  },
});
</script>
