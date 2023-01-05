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
    /** 当前页(从0开始) */
    const curr = ref(1)
    /** 宽度 */
    const width = ref(0)
    /** translateX */
    const x = computed(() => curr.value * width.value)

    return {
      curr,
      width,
      x
    }

  },
  mounted() {
    let carouselEl = this.$refs.carouselEl as HTMLDivElement
    let rect = carouselEl.getBoundingClientRect()
    this.width = rect.width
  },
  render() {
    const slots = this.$slots

    let $start = null
    let $end = null
    const $dots = []
    const $wipes = []
    if (slots.default != null) {
      const $default = slots.default()
      const len = $default.length
      // 循环播放
      if (this.loop) {
        // 在首页前面放一个末尾页，在末尾页的后面放一个首页
        $start = h($default[len - 1], { class: 'ph-carousel-item', 'data-index': 0 })
        $end = h($default[0], { class: 'ph-carousel-item', 'data-index': len - 1 })
      }

      for (let i = 0; i < len; i++) {
        $wipes.push(h($default[i], { class: 'ph-carousel-item', 'data-index': i + 1 }))
        $dots.push(h('div', {
          role: "button",
          class: ['ph-carousel-dot', (i === this.curr - 1) ? 'ph-carousel-dot__active' : '']
        }))
      }
    }

    return h("div", { class: "ph-carousel", ref: 'carouselEl' }, [
      h("div",
        {
          class: "ph-carousel-slides", style: {
            transform: `translate3d(-${this.x > 0 ? this.x + 'px' : '100%'}, 0, 0)`
          }
        }, [$start, $wipes, $end]
      ),
      h(
        "div",
        { class: "ph-carousel-dots" },
        $dots
      ),
    ])
  }
})
</script>
