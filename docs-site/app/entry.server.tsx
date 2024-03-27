import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { i18n, createInstance } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18nConfig from "./src/i18n/config";
import translation_zh from "../public/locales/zh/translation.json";
import translation_en from "../public/locales/en/translation.json";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const instance = createInstance() as i18n;
  const lng = "zh";

  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .init({
      ...i18nConfig, // spread the configuration
      lng, // The locale we detected above
      ns: ["translation"], // The namespaces the routes about to render wants to use
      // 这里没有使用fs后端, 因为cloudflare不支持fs模块, 使用内嵌资源替代.
      resources: {
        zh: {
          translation: translation_zh,
        },
        en: {
          translation: translation_en,
        },
      },
    });

  let html = renderToString(
    <I18nextProvider i18n={instance}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>
  );
  html = "<!DOCTYPE html>\n" + html;
  return new Response(html, {
    headers: { "Content-Type": "text/html" },
    status: responseStatusCode,
  });
}
