/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
// import type { ApiRequestOptions } from './ApiRequestOptions';

// type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
// type Headers = Record<string, string>;

// export type OpenAPIConfig = {
//     BASE: string;
//     VERSION: string;
//     WITH_CREDENTIALS: boolean;
//     CREDENTIALS: 'include' | 'omit' | 'same-origin';
//     TOKEN?: string | Resolver<string> | undefined;
//     USERNAME?: string | Resolver<string> | undefined;
//     PASSWORD?: string | Resolver<string> | undefined;
//     HEADERS?: Headers | Resolver<Headers> | undefined;
//     ENCODE_PATH?: ((path: string) => string) | undefined;
// };

// export const OpenAPI: OpenAPIConfig = {
//     BASE: '',
//     VERSION: '1',
//     WITH_CREDENTIALS: false,
//     CREDENTIALS: 'include',
//     TOKEN: undefined,
//     USERNAME: undefined,
//     PASSWORD: undefined,
//     HEADERS: undefined,
//     ENCODE_PATH: undefined,
// };



import type { ApiRequestOptions } from "./ApiRequestOptions";
import { useOidcStore } from "@/store/oidcStore";

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

export type OpenAPIConfig = {
  BASE: string;
  VERSION: string;
  WITH_CREDENTIALS: boolean;
  CREDENTIALS: "include" | "omit" | "same-origin";
  TOKEN?: string | Resolver<string> | undefined;
  USERNAME?: string | Resolver<string> | undefined;
  PASSWORD?: string | Resolver<string> | undefined;
  HEADERS?: Headers | Resolver<Headers> | undefined;
  ENCODE_PATH?: ((path: string) => string) | undefined;
};

export const OpenAPI: OpenAPIConfig = {
  BASE: import.meta.env["VITE_API_URL"],
  VERSION: "1",
  WITH_CREDENTIALS: false,
  CREDENTIALS: "include",
  TOKEN: () =>
    new Promise((resolve) =>
      resolve(useOidcStore().tokenInfo.access_token as string)
    ),
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: undefined,
  ENCODE_PATH: undefined,
};
