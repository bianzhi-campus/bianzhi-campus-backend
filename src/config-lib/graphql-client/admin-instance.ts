import "server-only";

import { graphqlClientInstanceConfig } from "@/project-config";

import { GraphQLClient } from "./graphql-client";
import type { RequestInterceptor, ResponseInterceptor } from "./types";

const endpoint =
  process.env.HASURA_ENDPOINT ?? graphqlClientInstanceConfig.endpoint;

/** 与 goc / 环境变量对齐：优先 HASURA_ADMIN_SECRET，否则沿用 graphql 默认配置里的 admin header */
function buildAdminHeaders(): Record<string, string> {
  const base = { ...(graphqlClientInstanceConfig.headers ?? {}) };
  const envSecret = process.env.HASURA_ADMIN_SECRET;
  if (envSecret) {
    base["x-hasura-admin-secret"] = envSecret;
  }
  if (!base["x-hasura-admin-secret"]) {
    throw new Error(
      "Hasura Admin：请在 .env.local 设置 HASURA_ADMIN_SECRET，或在 goc.config.ts 的 headers 中配置 x-hasura-admin-secret。"
    );
  }
  return base;
}

const adminHeaders = buildAdminHeaders();

const requestInterceptor: RequestInterceptor = (cfg) => ({
  ...cfg,
  headers: { ...cfg.headers, ...adminHeaders },
});

const responseInterceptor: ResponseInterceptor = (response) => response;

let adminClientInstance: GraphQLClient | null = null;

function getAdminClientInstance(): GraphQLClient {
  if (adminClientInstance) return adminClientInstance;
  adminClientInstance = new GraphQLClient({
    endpoint,
    headers: adminHeaders,
    requestInterceptor,
    responseInterceptor,
  });
  return adminClientInstance;
}

/** 仅服务端：管理后台 / 需 Admin Secret 的 Hasura 请求（与 getClient 同构，凭证不同） */
export function getAdminClient(): GraphQLClient {
  return getAdminClientInstance();
}

export async function adminGraphqlExecute<T, V extends Record<string, unknown> = Record<string, unknown>>(
  query: string,
  variables?: V
): Promise<T> {
  return getAdminClient().execute<T, V>({ query, variables });
}
