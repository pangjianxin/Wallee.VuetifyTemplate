import { useMainStore } from "@/store/appMainStore";

export const useSideMenu = defineStore(
  "side-menu",
  () => {
    const mainStore = useMainStore();
    const rail = ref(false);
    const permanent = ref(true);
    const temporary = ref(false);
    const sideMenuModel = ref(true);
    const udpatePermanent = (value: boolean) => {
      permanent.value = value;
    };
    const updateRail = (value: boolean) => {
      rail.value = value;
    };
    const updateSideMenuModel = (value: boolean) => {
      sideMenuModel.value = value;
    };
    const switchRail = () => {
      rail.value = !rail.value;
    };
    const switchSideMenuModel = () => {
      sideMenuModel.value = !sideMenuModel.value;
    };

    watch(
      () => mainStore.mobile,
      (newVal: boolean) => {
        updateSideMenuModel(!newVal);
        udpatePermanent(!newVal);
        temporary.value = newVal;
        if (newVal === true) {
          rail.value = false;
        }
      }
    );
    return {
      rail,
      updateRail,
      permanent,
      temporary,
      udpatePermanent,
      sideMenuModel,
      updateSideMenuModel,
      switchRail,
      switchSideMenuModel,
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
