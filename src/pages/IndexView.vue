<template>
  <div class="home">
    <a-input-search
      v-model:value="searchParams.text"
      placeholder="请输入查询内容"
      enter-button="搜索"
      size="large"
      @search="onSearch"
    />
    <a-tabs v-model:activeKey="activeKey" @change="onTaChange">
      <a-tab-pane key="1" tab="图片"
        ><picture-list :pictureList="pictureList"
      /></a-tab-pane>
      <a-tab-pane key="2" tab="帖子">
        <post-list :postList="postList" />
      </a-tab-pane>
      <a-tab-pane key="3" tab="用户">
        <user-list :userList="userList" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import PostList from "@/components/PostList.vue";
import UserList from "@/components/UserList.vue";
import PictureList from "@/components/PictureList.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, watchEffect } from "vue";
import myAxios from "@/plugins/myAxios";

const router = useRouter();
const route = useRoute();

const activeKey = ref(route.params.category || "1");

const searchParams = ref({
  text: "",
  pageSize: 10,
  pageNum: 1,
});
const postList = ref([]);
const userList = ref([]);
const pictureList = ref([]); // 使用 markRaw 标记为非响应式对象

myAxios.post("/post/list/page/vo", {}).then(function (res: any) {
  postList.value = res.records || []; // 确保有数据
});
myAxios.post("/user/list/page/vo", {}).then(function (res: any) {
  userList.value = res.records || []; // 确保有数据
});
myAxios.post("picture/list/page/vo", {}).then((res: any) => {
  pictureList.value = res.records || [];
});
watchEffect(() => {
  Object.assign(searchParams.value, {
    text: (route.query.text as string) || "",
  });
});

const onSearch = (searchText: string) => {
  router.push({
    query: {
      text: searchText,
    },
  });
};

const onTaChange = (key: string) => {
  router.push({
    path: `/${key}`,
    query: {
      text: searchParams.value.text,
    },
  });
};
</script>
