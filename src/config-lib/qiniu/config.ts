import { QiniuConfig } from "./QiniuUploader";
export type { QiniuConfig };

/**
 * 七牛云配置
 * @param accessKey 七牛云accessKey
 * @param secretKey 七牛云secretKey
 * @param bucket 七牛云bucket
 * @param zone 七牛云zone，默认auto，自动选择zone
 * @param baseUrl 七牛云baseUrl，拼接url用，默认空
 * @param dirPath 七牛云dirPath，自动生成key用，默认空
 */
export const qiniuConfig: QiniuConfig = {
  accessKey: process.env.QINIU_ACCESS_KEY || "",
  secretKey: process.env.QINIU_SECRET_KEY || "",
  bucket: process.env.QINIU_BUCKET || "",
  /** 与上传域名一致：z0 华东 z1 华北 z2 华南 na0 北美 as0 东南亚 */
  zone: process.env.QINIU_ZONE || undefined,
  baseUrl: process.env.QINIU_BASE_URL || "",
  dirPath: process.env.QINIU_DIR_PATH || "",
};