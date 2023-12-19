import path from "path";
import type { ActionFunctionArgs } from "@remix-run/node";
import {
  json,
  unstable_createFileUploadHandler as createFileUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";

export const action = async (args: ActionFunctionArgs) => {
  const { request } = args;
  const uploadHandler = createFileUploadHandler({
    directory: () => path.join(process.cwd(), "public"),
    maxPartSize: 10_000_000, //10M
    filter: ({ filename, name, contentType }) =>
      name === "upload" && ["image/jpeg", "image/png"].includes(contentType),
  });
  const formData = await parseMultipartFormData(request, uploadHandler);
  const file = formData.get("upload") as File;
  return json({ imageUrl: file.name });
};
