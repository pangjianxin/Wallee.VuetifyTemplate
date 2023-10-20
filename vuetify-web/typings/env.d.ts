// / <reference types="vite/client" />
import "vue-router/auto";
declare module "vue-router" {
  interface RouteMeta {
    // 是否需要认证
    requiredAuth?: boolean;
    //菜单图标
    icon?: string;
    //菜单标题
    title?: string;
    //是否可见
    visible?: boolean;
    //描述/分类
    desc?: string;
    //layout
    layout?: "default" | "404";
    //是否为底部菜单
    bottomMenu?: boolean;
  }
}
