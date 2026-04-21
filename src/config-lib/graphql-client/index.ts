/** 浏览器/通用：`getClient`。服务端管理后台请用 `./admin-instance`（含 server-only，勿从客户端经 index 再导出）。 */
export { GraphQLClient } from "./graphql-client";
export { getClient, GraphqlClientInstance } from "./instance";
export { default } from "./instance";
export type {
  GraphQLClientOptions,
  ExecuteOptions,
  RequestInterceptor,
  ResponseInterceptor,
  GraphQLRequestConfig,
  GraphQLResponseBody,
  CustomFetchFn,
} from "./types";
