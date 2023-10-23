// plugins/vuetify/vuetify.js
import "vuetify/styles";
import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from "vuetify/labs/VDataTable";
import { VInfiniteScroll } from "vuetify/labs/VInfiniteScroll";

export const vuetify = createVuetify({
  theme: { defaultTheme: "light" },
  icons: {
    defaultSet: "mdi",
    sets: {},
  },
  components: {
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
    VInfiniteScroll,
  },
});
