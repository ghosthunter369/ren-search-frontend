import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import IndexView from "@/pages/IndexView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: IndexView,
  },
  {
    path: "/:category",
    component: IndexView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
