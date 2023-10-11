<template>
  <div :class="[
    'ph-tabbar',
    'ph-tabbar-' + type,
    multiSelect ? 'ph-tabbar-multi' : '',
  ]">
    <div v-for="t in tabs" :key="t.name" class="ph-tabbar-item" :class="{
      'ph-tabbar-item--active':
        (type === 'nav' && curr === t.name) ||
        t.name === modelValue ||
        (modelValue instanceof Set && modelValue.has(t.name)),
    }" @click="tabChange(t.name)">
      {{ t.text }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'PhTabbar',
  props: {
    /** 配置选项卡, { name, text }[] */
    tabs: {
      type: Object as PropType<{ name: string | number; text: string }[]>,
      required: true,
    },
    /** 风格类型, nav(默认) - 底部导航栏模式, buttons - 按钮组模式  */
    type: {
      type: String,
      default: 'nav',
    },
    /** 如果是 buttons 模式的时候，配置默认的选项卡 */
    modelValue: {
      type: [String, Number, Set],
      default: '',
    },
    /** 是否需要多选 */
    multiSelect: {
      type: Boolean,
      default: false,
    },
    /** 自定义改变 */
    customChange: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      curr:
        this.type === 'nav'
          ? this.modelValue == null || this.modelValue === ''
            ? this.$route.name
            : this.modelValue
          : this.modelValue,
    };
  },
  methods: {
    tabChange(name: string | number) {
      if (this.type === 'nav') {
        if (name !== this.curr) {
          (this as any).$router.push({ name });
        }
      } else {
        if (this.multiSelect === false) {
          if (name !== this.modelValue) {
            if (!this.customChange) {
              this.$emit('update:modelValue', name);
            }
            this.$emit('change', name);
          }
        } else {
          if (this.modelValue instanceof Set) {
            if (!this.customChange) {
              if (this.modelValue.has(name)) {
                this.modelValue.delete(name);
              } else {
                this.modelValue.add(name);
              }
              this.$emit('update:modelValue', this.modelValue);
            }
            this.$emit('change', name);
          }
        }
      }
    },
  },
});
</script>
