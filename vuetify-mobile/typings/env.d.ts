// / <reference types="vite/client" />
import "vue-router";
declare module "vue-router" {
  interface RouteMeta {
    // 是否需要认证
    requiredAuth?: boolean;
    icon?: string;
    title?: string;
    visible?: boolean;
    desc?: string;
    layout?: "default" | "404";
  }
}

interface ImportMetaEnv {
  readonly MODE: string;
  BASE_URL: string;
  PROD: boolean;
  SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
