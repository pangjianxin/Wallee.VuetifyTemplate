// plugins/vuetify/vuetify.js
import "vuetify/styles";
import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";

export const vuetify = createVuetify({
  theme: { defaultTheme: "light" },
  icons: {
    defaultSet: "mdi",
    sets: {},
  },
});
