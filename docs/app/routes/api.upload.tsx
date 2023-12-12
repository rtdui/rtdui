import type { ActionFunctionArgs } from "@remix-run/server-runtime";
import {
  json,
  unstable_parseMultipartFormData,
} from "@remix-run/server-runtime";
import { createCloudflareKvUploadHandler } from "~/src/createCloudflareKvUploadHandler";
interface Env {
  RTDUI_KV: KVNamespace;
}
export const action = async (args: ActionFunctionArgs) => {
  const { request, context } = args;

  let env = context.env as Env;

  const uploadHandler = createCloudflareKvUploadHandler({
    kv: env.RTDUI_KV, // 由cloudflare管理平台上的kv绑定的名称
  });
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const fileName = formData.get("upload");
  return json({ imageUrl: fileName });
};
