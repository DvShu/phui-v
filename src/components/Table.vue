<template>
  <table class="ph-table" :class="{ 'ph-table-stripe': stripe }">
    <thead>
      <th
        v-for="(column, i) in columns"
        :key="i"
        :class="{
          'sort-column': column.sort,
          'sort-asc': sortInfo.key === column.key && sortInfo.order === 'asc',
          'sort-desc': sortInfo.key === column.key && sortInfo.order === 'desc',
        }"
        @click.stop="
          titleClick(
            column.key || i,
            column.sort || false,
            column.clickable || false
          )
        "
      >
        <span>{{ column.title }}</span>
        <span v-if="column.sort" class="caret-wrapper">
          <span class="sort-caret ascending"></span>
          <span class="sort-caret descending"></span>
        </span>
      </th>
    </thead>
    <tbody>
      <template v-if="props.datas != null">
        <template v-if="sortedDatas.length > 0">
          <tr
            v-for="(item, index) in sortedDatas"
            :key="keyField == null ? index : item[keyField]"
          >
            <slot :data="item" />
          </tr>
        </template>
        <tr v-else>
          <td :colspan="columns.length" class="ph-table__none-col">
            暂无数据记录！
          </td>
        </tr>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
export interface ColumnOption {
  /** 排序时，如果传递了 key，则会将此 key 回传，便于排序, 如果不传此 key，则排序无效 */
  key?: string;
  /** 文本 */
  title: string;
  /** 是否启用排序 */
  sort?: boolean;
  /** 是否启用该列的标题点击事件, 标题是否是可点击的, 配置为 true 后，可以监听 titleClick 事件 */
  clickable?: boolean;
}

/**
 * 默认排序规则配置
 */
export interface SortOption {
  /** 默认排序的 key */
  key: string;
  /** 默认排序的方向, asc - 升序, desc - 降序 */
  order: string;
}
</script>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    /** 列的配置 */
    columns: ColumnOption[];
    /** 创建带斑马纹的表格 */
    stripe?: boolean;
    /** 配置默认的排序规则，让数据一开始就显示排序后的数据 */
    defaultSort?: SortOption;
    /** 数据源 */
    datas?: any[];
    /** 列表组件 key */
    keyField?: string;
  }>(),
  {
    stripe: true,
    defaultSort: () => {
      return { key: '', order: '' };
    },
  }
);

/** 排序后的数据 */
const sortedDatas = ref<any[]>(props.datas == null ? [] : [...props.datas]);
const emits = defineEmits(['sort', 'titleClick']);
/** 排序信息 */
const sortInfo = reactive<SortOption>({
  key: props.defaultSort.key,
  order: props.defaultSort.order,
});

sort(); // 初始时对数据进行一次初始排序

// 监听数据源改变时，重新进行数据排序
watch(
  () => props.datas,
  () => {
    sortedDatas.value = props.datas != null ? [...props.datas] : [];
    sort(); // 对数据进行排序
  }
);

/** 排序 */
function sort() {
  if (sortInfo.key !== '' && sortInfo.order !== '') {
    if (sortInfo.order === 'desc') {
      // 降序
      sortedDatas.value.sort(
        (a: any, b: any) => b[sortInfo.key] - a[sortInfo.key]
      );
    } else {
      sortedDatas.value.sort(
        (a: any, b: any) => a[sortInfo.key] - b[sortInfo.key]
      );
    }
  }
}

/** 重置排序 */
const resetSort = () => {
  sortInfo.key = '';
  sortInfo.order = '';
};

defineExpose({
  /** 重置排序 */
  resetSort,
});

/**
 * 列的标题点击事件
 * @param key       点击的是某一列，如果列配置了 key，则为配置的 key，否则为列的index
 * @param isSort    该列是否启用了排序
 * @param clickable 列是否是可点击的
 */
function titleClick(key: string | number, isSort: boolean, clickable: boolean) {
  if (isSort && typeof key === 'string' && key !== '') {
    // 排序
    sortInfo.order =
      key === sortInfo.key
        ? sortInfo.order === 'asc'
          ? 'desc'
          : 'asc'
        : 'asc';
    sortInfo.key = key;
    if (props.datas == null) {
      emits('sort', key, sortInfo.order);
    } else {
      sort();
    }
  }
  if (clickable) {
    emits('titleClick');
  }
}
</script>

<style lang="less"></style>
