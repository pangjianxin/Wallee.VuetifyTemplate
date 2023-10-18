import { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";

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

router.beforeEach(async (to, _from, next) => {
  next();
});

router.afterEach(() => {});

export default router;
