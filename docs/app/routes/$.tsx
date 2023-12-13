import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { type Env } from "~/src/kv";
/**
 * $路由是一个匹配剩余路由的路由, 当没有其它路由匹配时, 该路由会匹配
 * 这个路由中用于从cloudflare的kv中获取资源. 如用户上传的资源
 */
export const loader = async (args: LoaderFunctionArgs) => {
  const { params, context } = args;
  const key = params["*"]; // 路由参数假定为kv的key, 该key是存储在kv中的资源文件名
  // 从cloudflare的kv中读取资源文件.
  const env = context.env as Env;
  const kv = env.RTDUI_KV;
  const { value, metadata } = await kv.getWithMetadata<any>(key!, {
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
};
