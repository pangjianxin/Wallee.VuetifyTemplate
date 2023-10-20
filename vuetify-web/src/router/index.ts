import { RouteRecordRaw } from "vue-router/auto";
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import { useOidcStore } from "@/store/oidcStore";
import { useGlobalStore } from "@/store/globalStore";

function recursiveLayouts(route: RouteRecordRaw): RouteRecordRaw {
  if (route.children) {
    for (let i = 0; i < route.children.length; i++) {
      route.children[i] = recursiveLayouts(route.children[i]);
    }
    return route;
  }

  return setupLayouts([route])[0];
}
const router = createRouter({
  extendRoutes: (routes: RouteRecordRaw[]) => {
    const mappedRoutes = routes.map((route) => {
      return recursiveLayouts(route);
    });
    return mappedRoutes;
  },
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const oidcStore = useOidcStore();
  if (!oidcStore.isTokenValid && to.path != "/login" && to.meta?.requiredAuth) {
    const globalStore = useGlobalStore();
    globalStore.setSnackbarText("该页面需要登录");
    next("/login");
  } else {
    next();
  }
});

router.afterEach(() => {});

export default router;
