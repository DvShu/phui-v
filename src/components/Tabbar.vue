<template>
  <div
    :class="[
      'ph-tabbar',
      'ph-tabbar-' + type,
      multiSelect ? 'ph-tabbar-multi' : '',
    ]"
  >
    <div
      v-for="t in tabs"
      :key="t.name"
      class="ph-tabbar-item"
      :class="{
        'ph-tabbar-item--active':
          (type === 'nav' && curr === t.name) ||
          t.name === modelValue ||
          (modelValue instanceof Set && modelValue.has(t.name)),
      }"
      @click="tabChange(t.name)"
    >
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
      type: Object as PropType<{ name: string; text: string }[]>,
      required: true,
    },
    /** 风格类型, nav(默认) - 底部导航栏模式, buttons - 按钮组模式  */
    type: {
      type: String,
      default: 'nav',
    },
    /** 如果是 buttons 模式的时候，配置默认的选项卡 */
    modelValue: {
      type: [String, Set],
      default: '',
    },
    /** 是否需要多选 */
    multiSelect: {
      type: Boolean,
      default: false,
    },
    /** 选择改变时调用 */
    onChange: {
      type: Function as PropType<
        (tabs: Set<string>, name: string, method: string) => void
      >,
      required: false,
      default: () => {
        return null;
      },
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      curr: this.type === 'nav' ? this.$route.name : this.modelValue,
    };
  },
  methods: {
    tabChange(name: string) {
      if (this.type === 'nav') {
        if (name !== this.curr) {
          (this as any).$router.push({ name });
        }
      } else {
        if (this.multiSelect === false) {
          if (name !== this.modelValue) {
            this.$emit('update:modelValue', name);
          }
        } else {
          if (this.modelValue instanceof Set) {
            if (this.modelValue.has(name)) {
              if (this.onChange != null) {
                this.onChange(this.modelValue as Set<string>, name, 'delete');
              } else {
                this.modelValue.delete(name);
              }
            } else {
              if (this.onChange != null) {
                this.onChange(this.modelValue as Set<string>, name, 'add');
              } else {
                this.modelValue.add(name);
              }
            }
            this.$emit('update:modelValue', this.modelValue);
          }
        }
      }
    },
  },
});
</script>
