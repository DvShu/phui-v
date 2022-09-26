<script lang="ts">
import { defineComponent, h, VNode, ref, onMounted, computed, useSlots } from "vue"

export default defineComponent({
  name: "PhCarousel",
  props: {
    /** 是否循环播放, 默认：true */
    loop: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    /** 轮播根节点 */
    const carouselEl = ref<HTMLDivElement>()
    /** 当前页(从0开始) */
    const curr = ref(1)
    /** 宽度 */
    const width = ref(0)
    /** translateX */
    const x = computed(() => curr.value * width.value)
    const slots = useSlots()

    onMounted(() => {
      if (carouselEl.value != null) {
        let rect = carouselEl.value.getBoundingClientRect()
        width.value = rect.width
        setTimeout(() => {
          curr.value = 2
        }, 3000);
      }
    })

    return () => h("div", { class: "ph-carousel", ref: carouselEl }, [
      h("div", {
        class: "ph-carousel-slides", style: {
          transform: `translate3d(-${x.value > 0 ? x.value + 'px' : '100%'}, 0, 0)`
        }
      }, [width.value > 0 ? [
        // 循环播放(在首页前面放一个末尾页，在末尾页的后面放一个首页)
        (props.loop && slots.default != null) ? h((slots as any).default()[(slots as any).default().length - 1], { class: 'ph-carousel-item', 'data-index': 0 }) : null,
        [slots.default != null ? (slots as any).default().map((slot: any, i: number) => h(slot, { class: 'ph-carousel-item', 'data-index': i + 1 })) : null],
        // 循环播放(在首页前面放一个末尾页，在末尾页的后面放一个首页)
        (props.loop && slots.default != null) ? h((slots as any).default()[0], { class: 'ph-carousel-item', 'data-index': (slots as any).default().length - 1 }) : null,
      ] : null]),
      h(
        "div",
        { class: "ph-carousel-dots" },
        [slots.default != null ? (slots as any).default().map((slot: any, i: number) => h('div', {
          role: "button",
          class: ['ph-carousel-dot', (i === curr.value - 1) ? 'ph-carousel-dot__active' : '']
        })) : null]
      ),
    ])
  },
})
</script>
