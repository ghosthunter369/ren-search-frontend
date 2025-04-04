import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

const app = createApp(App);
app.use(Antd);
app.use(router); // 确保 router 正确注册
app.mount("#app");
