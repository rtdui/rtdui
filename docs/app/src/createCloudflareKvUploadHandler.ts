import type { UploadHandler } from "@remix-run/cloudflare";

export function createCloudflareKvUploadHandler(options: {
  kv: any;
}): UploadHandler {
  const { kv } = options ?? {};
  return async ({ filename, contentType, name, data }) => {
    // 将类型为AsyncIterable<Uint8Array>的data对象转换为Blob对象
    let chunks = [];
    for await (let chunk of data) {
      chunks.push(chunk);
    }
    const blob = new Blob(chunks, { type: contentType });

    const key = `${filename}-${Date.now()}`;
    // 保存到cloudflare的kv中
    await kv.put(key, blob.stream(), {
      expirationTtl: 1 * 60 * 60,
      metadata: { filename, contentType },
    }); // 1小时后自动过期
    return key;
  };
}
