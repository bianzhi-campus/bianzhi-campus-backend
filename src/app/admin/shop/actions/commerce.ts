"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import {
  canWriteShop,
  getConsoleAuth,
  type ConsoleAuth,
} from "@/server/admin-auth";

function redirectCommerceForbidden() {
  redirect("/admin/portal?error=forbidden");
}

async function requireAuth(): Promise<ConsoleAuth> {
  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  return auth;
}

function assertPlatformOnly(auth: ConsoleAuth): void {
  if (auth.mode === "legacy_full") return;
  if (auth.access.isPlatformAdmin) return;
  redirectCommerceForbidden();
}

function assertShopWrite(auth: ConsoleAuth, shopId: string): void {
  if (auth.mode === "legacy_full") return;
  if (canWriteShop(auth.access, shopId)) return;
  redirectCommerceForbidden();
}

/** 表单可选 `_ctx=platform`，与 `createCampusAction` 同理 */
function shopCommercePathsFromForm(formData: FormData): { list: string; newPage: string } {
  const platform = String(formData.get("_ctx") ?? "").trim() === "platform";
  return platform
    ? { list: "/admin/platform/shops", newPage: "/admin/platform/shops/new" }
    : { list: "/admin/shop", newPage: "/admin/shop" };
}

async function shopIdOfProduct(productId: string): Promise<string | null> {
  const { products_by_pk } = await adminGraphqlExecute<{
    products_by_pk: { shop_shops: string } | null;
  }>(
    `
    query P($id: bigint!) {
      products_by_pk(id: $id) {
        shop_shops
      }
    }
  `,
    { id: productId }
  );
  return products_by_pk?.shop_shops ?? null;
}

function parseJsonArrayField(raw: string, emptyAsNull: boolean): unknown {
  const t = raw.trim();
  if (!t) return emptyAsNull ? null : [];
  try {
    const v = JSON.parse(t) as unknown;
    if (!Array.isArray(v)) throw new Error("not array");
    return v;
  } catch {
    throw new Error("json");
  }
}

function parseJsonValueField(raw: string): unknown {
  const t = raw.trim();
  if (!t) return [];
  try {
    return JSON.parse(t) as unknown;
  } catch {
    throw new Error("json");
  }
}

type ParsedSkuRow = {
  name: string;
  price: string;
  stock: string;
  sort_order: string;
  price_unit: string | null;
  image_url: string | null;
  is_shelved: boolean;
};

/** 新建商品表单中客户端组件提交的 `sku_rows` JSON */
function parseSkuRowsField(raw: string): ParsedSkuRow[] {
  const t = raw.trim();
  if (!t) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(t) as unknown;
  } catch {
    throw new Error("sku_json");
  }
  if (!Array.isArray(parsed)) throw new Error("sku_json");
  const out: ParsedSkuRow[] = [];
  for (const item of parsed) {
    if (typeof item !== "object" || item === null) continue;
    const o = item as Record<string, unknown>;
    const name = String(o.name ?? "").trim();
    if (!name) continue;
    const priceRaw = String(o.price ?? "").trim();
    const stockRaw = String(o.stock ?? "").trim();
    const sortRaw = String(o.sort_order ?? "").trim();
    const price = priceRaw === "" ? 0 : parseFloat(priceRaw);
    const stock = stockRaw === "" ? 0 : parseInt(stockRaw, 10);
    const sort_order = sortRaw === "" ? 0 : parseInt(sortRaw, 10);
    if (Number.isNaN(price) || Number.isNaN(stock) || Number.isNaN(sort_order)) {
      throw new Error("sku_json");
    }
    const price_unit_raw = String(o.price_unit ?? "").trim();
    const image_url_raw = String(o.image_url ?? "").trim();
    out.push({
      name,
      price: String(price),
      stock: String(stock),
      sort_order: String(sort_order),
      price_unit: price_unit_raw ? price_unit_raw : null,
      image_url: image_url_raw ? image_url_raw : null,
      is_shelved: Boolean(o.is_shelved),
    });
  }
  return out;
}

/* ---------- shops ---------- */

export async function createShopAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();
  assertPlatformOnly(auth);

  const paths = shopCommercePathsFromForm(formData);
  const name = String(formData.get("name") ?? "").trim();
  if (!name) redirect(`${paths.newPage}?error=name`);

  let extend_shop_ids: unknown;
  let hidden_product_ids: unknown;
  try {
    extend_shop_ids = parseJsonArrayField(String(formData.get("extend_shop_ids") ?? ""), false);
    hidden_product_ids = parseJsonArrayField(String(formData.get("hidden_product_ids") ?? ""), false);
  } catch {
    redirect(`${paths.newPage}?error=json`);
  }

  await adminGraphqlExecute(
    `
    mutation InsertShop($object: shops_insert_input!) {
      insert_shops_one(object: $object) {
        id
      }
    }
  `,
    { object: { name, extend_shop_ids, hidden_product_ids } }
  );

  revalidatePath("/admin/shop");
  revalidatePath("/admin/platform/shops");
  redirect(paths.list);
}

function shopEditUrl(formData: FormData, id: string): string {
  const platform = String(formData.get("_ctx") ?? "").trim() === "platform";
  return platform ? `/admin/platform/shops/${id}/edit` : `/admin/shop`;
}

export async function updateShopAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();

  const paths = shopCommercePathsFromForm(formData);
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!id || !name) redirect(`${paths.list}?error=invalid`);

  assertShopWrite(auth, id);

  let extend_shop_ids: unknown;
  let hidden_product_ids: unknown;
  try {
    extend_shop_ids = parseJsonArrayField(String(formData.get("extend_shop_ids") ?? ""), false);
    hidden_product_ids = parseJsonArrayField(String(formData.get("hidden_product_ids") ?? ""), false);
  } catch {
    redirect(`${shopEditUrl(formData, id)}?error=json`);
  }

  await adminGraphqlExecute(
    `
    mutation UpdateShop($id: bigint!, $set: shops_set_input!) {
      update_shops_by_pk(pk_columns: { id: $id }, _set: $set) {
        id
      }
    }
  `,
    { id, set: { name, extend_shop_ids, hidden_product_ids } }
  );

  revalidatePath("/admin/shop");
  revalidatePath("/admin/platform/shops");
  redirect(paths.list);
}

export async function deleteShopAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();
  assertPlatformOnly(auth);

  const paths = shopCommercePathsFromForm(formData);
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  try {
    await adminGraphqlExecute(
      `
      mutation DeleteShop($id: bigint!) {
        delete_shops_by_pk(id: $id) {
          id
        }
      }
    `,
      { id }
    );
  } catch {
    redirect(`${paths.list}?error=delete`);
  }

  revalidatePath("/admin/shop");
  revalidatePath("/admin/platform/shops");
  redirect(paths.list);
}

/* ---------- products ---------- */

export async function createProductAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();

  const shop_shops = String(formData.get("shop_shops") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const cover_image_url = String(formData.get("cover_image_url") ?? "").trim() || null;
  const description = String(formData.get("description") ?? "").trim() || null;
  const sort_order = String(formData.get("sort_order") ?? "").trim();
  const sort = sort_order === "" ? 0 : parseInt(sort_order, 10);
  const is_shelved = formData.get("is_shelved") === "on";

  let detail_medias: unknown;
  try {
    detail_medias = parseJsonValueField(String(formData.get("detail_medias") ?? "[]"));
  } catch {
    redirect("/admin/shop/products/new?error=json");
  }

  let skuRows: ParsedSkuRow[];
  try {
    skuRows = parseSkuRowsField(String(formData.get("sku_rows") ?? ""));
  } catch {
    redirect("/admin/shop/products/new?error=sku_json");
  }

  if (!shop_shops || !name || Number.isNaN(sort)) {
    redirect("/admin/shop/products/new?error=invalid");
  }

  if (skuRows.length === 0) {
    redirect("/admin/shop/products/new?error=sku_required");
  }

  assertShopWrite(auth, shop_shops);

  let res: { insert_products_one: { id: string } | null };
  try {
    res = await adminGraphqlExecute<{
      insert_products_one: { id: string } | null;
    }>(
      `
      mutation InsertProduct($object: products_insert_input!) {
        insert_products_one(object: $object) {
          id
        }
      }
    `,
      {
        object: {
          shop_shops,
          name,
          cover_image_url,
          description,
          detail_medias,
          sort_order: String(sort),
          is_shelved,
          product_skus: {
            data: skuRows.map((row) => ({
              name: row.name,
              price: row.price,
              stock: row.stock,
              sort_order: row.sort_order,
              price_unit: row.price_unit,
              image_url: row.image_url,
              is_shelved: row.is_shelved,
            })),
          },
        },
      }
    );
  } catch {
    redirect("/admin/shop/products/new?error=insert");
  }

  revalidatePath("/admin/shop/products");
  const newId = res.insert_products_one?.id;
  if (newId) {
    redirect(`/admin/shop/products/${newId}/edit`);
  }
  redirect("/admin/shop/products");
}

export async function updateProductAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();

  const id = String(formData.get("id") ?? "");
  const shop_shops = String(formData.get("shop_shops") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const cover_image_url = String(formData.get("cover_image_url") ?? "").trim() || null;
  const description = String(formData.get("description") ?? "").trim() || null;
  const sort_order = String(formData.get("sort_order") ?? "").trim();
  const sort = sort_order === "" ? 0 : parseInt(sort_order, 10);
  const is_shelved = formData.get("is_shelved") === "on";

  let detail_medias: unknown;
  try {
    detail_medias = parseJsonValueField(String(formData.get("detail_medias") ?? "[]"));
  } catch {
    redirect(`/admin/shop/products/${id}/edit?error=json`);
  }

  if (!id || !shop_shops || !name || Number.isNaN(sort)) {
    redirect("/admin/shop/products?error=invalid");
  }

  const oldShop = await shopIdOfProduct(id);
  if (oldShop) assertShopWrite(auth, oldShop);
  assertShopWrite(auth, shop_shops);

  await adminGraphqlExecute(
    `
    mutation UpdateProduct($id: bigint!, $set: products_set_input!) {
      update_products_by_pk(pk_columns: { id: $id }, _set: $set) {
        id
      }
    }
  `,
    {
      id,
      set: {
        shop_shops,
        name,
        cover_image_url,
        description,
        detail_medias,
        sort_order: String(sort),
        is_shelved,
      },
    }
  );

  revalidatePath("/admin/shop/products");
  revalidatePath(`/admin/shop/products/${id}/edit`);
  redirect(`/admin/shop/products/${id}/edit`);
}

export async function deleteProductAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const sid = await shopIdOfProduct(id);
  if (sid) assertShopWrite(auth, sid);

  try {
    await adminGraphqlExecute(
      `
      mutation DeleteProductSkus($pid: bigint!) {
        delete_product_skus(where: { product_products: { _eq: $pid } }) {
          affected_rows
        }
      }
    `,
      { pid: id }
    );
    await adminGraphqlExecute(
      `
      mutation DeleteProduct($id: bigint!) {
        delete_products_by_pk(id: $id) {
          id
        }
      }
    `,
      { id }
    );
  } catch {
    redirect("/admin/shop/products?error=delete");
  }

  revalidatePath("/admin/shop/products");
  redirect("/admin/shop/products");
}

/* ---------- product_skus ---------- */

export async function createProductSkuAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();

  const product_products = String(formData.get("product_products") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").trim();
  const stockRaw = String(formData.get("stock") ?? "").trim();
  const sortRaw = String(formData.get("sort_order") ?? "").trim();
  const image_url = String(formData.get("image_url") ?? "").trim() || null;
  const price_unit = String(formData.get("price_unit") ?? "").trim() || null;
  const price = priceRaw === "" ? 0 : parseFloat(priceRaw);
  const stock = stockRaw === "" ? 0 : parseInt(stockRaw, 10);
  const sort_order = sortRaw === "" ? 0 : parseInt(sortRaw, 10);
  const is_shelved = formData.get("is_shelved") === "on";

  if (!product_products || !name || Number.isNaN(price) || Number.isNaN(stock) || Number.isNaN(sort_order)) {
    redirect("/admin/shop/products?error=sku_invalid");
  }

  const sid = await shopIdOfProduct(product_products);
  if (sid) assertShopWrite(auth, sid);

  try {
    await adminGraphqlExecute(
      `
      mutation InsertSku($object: product_skus_insert_input!) {
        insert_product_skus_one(object: $object) {
          id
        }
      }
    `,
      {
        object: {
          product_products,
          name,
          price: String(price),
          stock: String(stock),
          sort_order: String(sort_order),
          price_unit,
          image_url,
          is_shelved,
        },
      }
    );
  } catch {
    redirect(`/admin/shop/products/${product_products}/edit?error=sku_insert`);
  }

  revalidatePath("/admin/shop/products");
  revalidatePath(`/admin/shop/products/${product_products}/edit`);
  redirect(`/admin/shop/products/${product_products}/edit`);
}

export async function updateProductSkuAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();

  const id = String(formData.get("id") ?? "");
  const productId = String(formData.get("product_id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").trim();
  const stockRaw = String(formData.get("stock") ?? "").trim();
  const sortRaw = String(formData.get("sort_order") ?? "").trim();
  const image_url = String(formData.get("image_url") ?? "").trim() || null;
  const price_unit = String(formData.get("price_unit") ?? "").trim() || null;
  const price = priceRaw === "" ? 0 : parseFloat(priceRaw);
  const stock = stockRaw === "" ? 0 : parseInt(stockRaw, 10);
  const sort_order = sortRaw === "" ? 0 : parseInt(sortRaw, 10);
  const is_shelved = formData.get("is_shelved") === "on";

  if (!id || !productId || !name || Number.isNaN(price) || Number.isNaN(stock) || Number.isNaN(sort_order)) {
    redirect(`/admin/shop/products/${productId}/edit?error=sku_invalid`);
  }

  const sid = await shopIdOfProduct(productId);
  if (sid) assertShopWrite(auth, sid);

  try {
    await adminGraphqlExecute(
      `
      mutation UpdateSku($id: bigint!, $set: product_skus_set_input!) {
        update_product_skus_by_pk(pk_columns: { id: $id }, _set: $set) {
          id
        }
      }
    `,
      {
        id,
        set: {
          name,
          price: String(price),
          stock: String(stock),
          sort_order: String(sort_order),
          price_unit,
          image_url,
          is_shelved,
        },
      }
    );
  } catch {
    redirect(`/admin/shop/products/${productId}/edit?error=sku_update`);
  }

  revalidatePath(`/admin/shop/products/${productId}/edit`);
  redirect(`/admin/shop/products/${productId}/edit`);
}

export async function deleteProductSkuAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();

  const id = String(formData.get("id") ?? "");
  const productId = String(formData.get("product_id") ?? "").trim();
  if (!id || !productId) return;

  const sid = await shopIdOfProduct(productId);
  if (sid) assertShopWrite(auth, sid);

  try {
    await adminGraphqlExecute(
      `
      mutation DeleteSku($id: bigint!) {
        delete_product_skus_by_pk(id: $id) {
          id
        }
      }
    `,
      { id }
    );
  } catch {
    redirect(`/admin/shop/products/${productId}/edit?error=sku_delete`);
  }

  revalidatePath(`/admin/shop/products/${productId}/edit`);
  redirect(`/admin/shop/products/${productId}/edit`);
}
