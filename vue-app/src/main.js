import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "./index.css";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(createPinia());
app.use(Vue3Toastify, {
  position: "top-center",
  autoClose: 1500,
});

app.use(pinia);
app.mount("#app");
