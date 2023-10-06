import { createApp } from "vue";
import "./styles/index.scss";
import App from "./App.vue";
import router from "./router";
import { vuetify } from "@/plugins/vuetify";
import pinia from "@/store";
const app = createApp(App);
app.use(vuetify);
app.use(pinia);
app.use(router);

app.config.errorHandler = (err, instance, info) => {
  // Handle the error globally
  console.error("Global error:", err);
  console.log("Vue instance:", instance);
  console.log("Error info:", info);

  // Add code for UI notifications, reporting or other error handling logic
};
app.mount("#app");
