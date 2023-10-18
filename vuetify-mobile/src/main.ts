/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);

registerPlugins(app);

app.config.errorHandler = (err, instance, info) => {
  // Handle the error globally
  console.error("Global error:", err);
  console.log("Vue instance:", instance);
  console.log("Error info:", info);

  // Add code for UI notifications, reporting or other error handling logic
};

app.mount("#app");
