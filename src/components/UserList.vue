<script setup lang="ts">
import { defineProps } from "vue";

// 定义 props，确保 userList 类型正确
const props = defineProps<{
  userList: any[];
}>();
</script>

<template>
  <a-list
    v-if="props.userList?.length"
    item-layout="horizontal"
    :data-source="props.userList"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card hoverable style="width: 240px" :bordered="true">
          <template #cover>
            <img alt="example" :src="item?.userAvatar || '默认头像链接'" />
          </template>
          <a-card-meta :title="item?.userName || '未知用户'">
            <template #description>
              {{ item?.userProfile || "暂无简介" }}
            </template>
          </a-card-meta>
        </a-card>
      </a-list-item>
    </template>
  </a-list>

  <p v-else>暂无用户数据</p>
</template>

<style scoped></style>
