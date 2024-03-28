// fetch from kv
export async function onRequest(context) {
  const { request, params, env } = context;
  const key = params.path; // 路由参数假定为kv的key, 该key是存储在kv中的资源文件名
  // 从cloudflare的kv中读取资源文件.
  const kv = env.RTDUI_KV;
  const { value, metadata } = await kv.getWithMetadata(key, {
    type: "stream",
  });

  // 如果kv中存在则返回文件, 不存在会返回null
  if (value) {
    return new Response(value, {
      headers: {
        "content-type": metadata.contentType,
      },
    });
  }
  return new Response(null, {
    status: 404,
  });
}
