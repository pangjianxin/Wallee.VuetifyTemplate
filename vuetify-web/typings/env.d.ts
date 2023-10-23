// / <reference types="vite/client" />
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

declare module "vue-router/auto/routes" {
  import type {
    RouteRecordInfo,
    ParamValue,
    // these are other param helper types
    //ParamValueOneOrMore,
    //ParamValueZeroOrMore,
    //ParamValueZeroOrOne,
  } from "unplugin-vue-router";

  export interface RouteNamedMap {
    "indicator.update": RouteRecordInfo<
      "indicator.update",
      "/indicators/update/[indicatorId]",
      { indicatorId: ParamValue<string> },
      { indicatorId: ParamValue<string> }
    >;
  }
}

export type MenuInfo = {
  icon: string;
  title: string;
  routeName: string;
  path: string;
};
