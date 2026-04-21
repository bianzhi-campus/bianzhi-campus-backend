/**
 * 浏览器端七牛表单上传（与 /api/qiniu-upload/token 配合）
 * 仅能在 Client Component 或浏览器环境中调用。
 */

export type QiniuTokenPayload = {
  token: string;
  uploadUrl: string;
  baseUrl: string;
  dirPath: string;
};

function normalizeDirPath(dirPath: string): string {
  if (!dirPath) return "uploads/";
  return dirPath.endsWith("/") ? dirPath : `${dirPath}/`;
}

function buildObjectKey(filename: string, dirPath: string): string {
  const ext = filename.split(".").pop() || "bin";
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  return `${normalizeDirPath(dirPath)}${timestamp}-${random}.${ext}`;
}

function publicUrl(baseUrl: string, key: string): string {
  const base = baseUrl.replace(/\/+$/, "");
  const path = key.replace(/^\/+/, "");
  return `${base}/${path}`;
}

/**
 * 直传文件到七牛，返回可访问的完整 URL
 */
export async function uploadFileToQiniuDirect(file: File): Promise<string> {
  const tokenRes = await fetch("/api/qiniu-upload/token", { method: "GET" });
  if (!tokenRes.ok) {
    throw new Error("获取上传凭证失败");
  }
  const json = (await tokenRes.json()) as {
    success?: boolean;
    message?: string;
    data?: QiniuTokenPayload;
  };
  if (!json.success || !json.data?.token) {
    throw new Error(json.message ?? "获取上传凭证失败");
  }

  const { token, uploadUrl, baseUrl, dirPath } = json.data;
  const key = buildObjectKey(file.name, dirPath);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      if (xhr.status !== 200) {
        try {
          const err = JSON.parse(xhr.responseText) as { error?: string; message?: string };
          reject(new Error(err.error ?? err.message ?? `上传失败 HTTP ${xhr.status}`));
        } catch {
          reject(new Error(`上传失败 HTTP ${xhr.status}`));
        }
        return;
      }
      try {
        const data = JSON.parse(xhr.responseText) as { key?: string; error?: string };
        if (data.error) {
          reject(new Error(data.error));
          return;
        }
        if (!data.key) {
          reject(new Error("上传响应缺少 key"));
          return;
        }
        if (!baseUrl) {
          reject(new Error("未配置 QINIU_BASE_URL，无法生成访问地址"));
          return;
        }
        resolve(publicUrl(baseUrl, data.key));
      } catch {
        reject(new Error("解析上传结果失败"));
      }
    });
    xhr.addEventListener("error", () => reject(new Error("网络错误")));
    const formData = new FormData();
    formData.append("file", file);
    formData.append("token", token);
    formData.append("key", key);
    xhr.open("POST", uploadUrl);
    xhr.send(formData);
  });
}
