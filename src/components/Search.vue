<template>
  <div class="ph-search">
    <SearchIcon class="ph-search__prefix"></SearchIcon>
    <input type="search" class="ph-input__inline" />
    <div class="ph-search__clear">
      <MaskCloseIcon></MaskCloseIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchIcon from "./icon/Search.vue";
import MaskCloseIcon from "./icon/MaskClose.vue";
</script>

<style lang="less"></style>
