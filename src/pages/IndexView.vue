<template>
  <div class="home">
    <a-input-search
      v-model:value="searchParams.searchText"
      placeholder="请输入查询内容"
      enter-button="搜索"
      size="large"
      @search="onSearch"
    />
    <a-tabs v-model:activeKey="activeKey" @change="onTaChange">
      <a-tab-pane key="picture" tab="图片">
        <picture-list :pictureList="pictureList" />
      </a-tab-pane>
      <a-tab-pane key="post" tab="帖子">
        <post-list :postList="postList" />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
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

const activeKey = ref(route.params.category || "post");

const searchParams = ref({
  searchText: "忍野忍", // 修改字段名
  pageSize: 10,
  pageNum: 1,
  type: activeKey.value,
});

const postList = ref([]);
const userList = ref([]);
const pictureList = ref([]);

const loadDataNew = (params: any) => {
  myAxios.post("/search/get/all", params).then((res: any) => {
    switch (params.type) {
      case "post":
        postList.value = res.postVOS || [];
        break;
      case "user":
        userList.value = res.userVOS || [];
        break;
      case "picture":
        pictureList.value = res.pictures || [];
        break;
    }
  });
};

// 监听路由变化，更新搜索参数
watchEffect(() => {
  searchParams.value.searchText = (route.query.searchText as string) || "";
});

// 搜索事件
const onSearch = (searchText: string) => {
  router.push({
    query: {
      searchText: searchText, // 确保 URL 参数名也修改
    },
  });

  searchParams.value.searchText = searchText;
  loadDataNew(searchParams.value);
};

// 切换 Tab 事件
const onTaChange = (key: string) => {
  router.push({
    path: `/${key}`,
    query: {
      searchText: searchParams.value.searchText, // 确保 URL 参数名也修改
    },
  });

  searchParams.value.type = key;
  loadDataNew(searchParams.value);
};

// 初始化数据
loadDataNew(searchParams.value);
</script>
