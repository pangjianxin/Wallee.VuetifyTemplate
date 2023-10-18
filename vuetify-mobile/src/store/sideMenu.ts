export const useSideMenu = defineStore(
  "side-menu",
  () => {
    const rail = ref(false);
    const permanent = ref(true);
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
    return {
      rail,
      updateRail,
      permanent,
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
