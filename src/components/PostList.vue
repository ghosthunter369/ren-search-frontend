<script setup lang="ts">
import { defineProps } from "vue";

// 定义 props
const props = defineProps<{
  postList: Array<{
    id: number;
    title: string;
    content: string;
    image?: string;
  }>;
}>();
</script>

<template>
  <a-list item-layout="horizontal" :data-source="props.postList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :description="item.content">
          <template #title>
            <a href="https://www.antdv.com/">{{ item.title }}</a>
          </template>
          <template #avatar>
            <a-avatar
              :src="
                item.image ||
                'https://img0.baidu.com/it/u=1597734620,1431760719&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
              "
            />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped></style>
