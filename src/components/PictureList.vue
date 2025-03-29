<template>
  <a-list
    item-layout="horizontal"
    :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
    :data-source="[...props.pictureList]"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card hoverable>
          <template #cover>
            <img :src="item.url" />
          </template>
          <a-card-meta :title="item.title" />
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import { watch, defineProps } from "vue";

const props = defineProps({
  pictureList: Array,
});

watch(
  () => props.pictureList,
  (newVal) => {
    console.log("子组件收到的新 pictureList 数据:", newVal);
  },
  { deep: true, immediate: true } // 立刻执行一次，确保能看到初始值
);
</script>
