import * as multipartParser from "@web3-storage/multipart-parser";

/**
 * Allows you to handle multipart forms (file uploads) for your app.
 *
 * TODO: Update this comment
 * @see https://remix.run/utils/parse-multipart-form-data
 */
async function parseMultipartFormData(request, uploadHandler) {
  let contentType = request.headers.get("Content-Type") || "";
  let [type, boundary] = contentType.split(/\s*;\s*boundary=/);
  if (!request.body || !boundary || type !== "multipart/form-data") {
    throw new TypeError("Could not parse content as FormData.");
  }
  let formData = new FormData();
  let parts = multipartParser.streamMultipart(request.body, boundary);
  for await (let part of parts) {
    if (part.done) break;
    if (typeof part.filename === "string") {
      // only pass basename as the multipart/form-data spec recommends
      // https://datatracker.ietf.org/doc/html/rfc7578#section-4.2
      part.filename = part.filename.split(/[/\\]/).pop();
    }
    let value = await uploadHandler(part);
    if (typeof value !== "undefined" && value !== null) {
      formData.append(part.name, value);
    }
  }
  return formData;
}

export function createCloudflareKvUploadHandler(options) {
  const { kv, expirationTtl } = options ?? {};
  return async ({ filename, contentType, name, data }) => {
    // 将类型为AsyncIterable<Uint8Array>的data对象转换为Blob对象
    let chunks = [];
    for await (const chunk of data) {
      chunks.push(chunk);
    }
    const blob = new Blob(chunks, { type: contentType });

    const key = `${filename}-${Date.now()}`;
    // 保存到cloudflare的kv中
    await kv.put(key, blob.stream(), {
      expirationTtl, // 生存时间(秒)
      metadata: { filename, contentType },
    }); // 1小时后自动过期
    return key;
  };
}

// upload to kv
export async function onRequest(context) {
  const { request, params, env } = context;
  const uploadHandler = createCloudflareKvUploadHandler({
    kv: env.RTDUI_KV, // 由cloudflare管理平台上的kv绑定的名称
    expirationTtl: 1 * 60 * 60, // 默认保留1小时
  });
  const formData = await parseMultipartFormData(request, uploadHandler);

  const fileName = formData.get("upload");
  return new Response(JSON.stringify({ imageUrl: `kv/${fileName}` }), {
    headers: {
      "Content-Type": "application/json; utf-8",
    },
  });
}
