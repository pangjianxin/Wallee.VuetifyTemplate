import { useTheme } from "vuetify";
import { useDisplay } from "vuetify";

export const useMainStore = defineStore(
  "main",
  () => {
    const themeInstance = useTheme();
    const displayInstance = useDisplay();
    const theme = ref("dark");
    const mobile = ref(false);

    const toggleTheme = () => {
      themeInstance.global.name.value = themeInstance.global.current.value.dark
        ? "light"
        : "dark";
    };

    watch(
      () => themeInstance.global.name.value,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          theme.value = newVal;
        }
      }
    );

    watch(
      () => displayInstance.mobile.value,
      (newVal, oldVal) => {
        if (newVal != oldVal) {
          mobile.value = newVal;
        }
      }
    );

    return { theme, toggleTheme, mobile };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
