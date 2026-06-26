import { PassThrough } from "node:stream";
import type { EntryContext, RouterContextProvider } from "react-router";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
import { renderToPipeableStream } from "react-dom/server";
import { createInstance } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18nConfig from "./src/i18n/config";
import translation_zh from "../public/locales/zh/translation.json";
import translation_en from "../public/locales/en/translation.json";
import { LanguageDetector } from "./src/i18n/detector";

export const streamTimeout = 5_000;

const languageDetector = new LanguageDetector({
  supportedLanguages: i18nConfig.supportedLngs,
  fallbackLanguage: i18nConfig.fallbackLng,
});

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  entryContext: EntryContext,
  routerContext: RouterContextProvider,
) {
  // const lng = "zh";
  const lng = await languageDetector.detect(request);
  const instance = createInstance();
  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .init({
      ...i18nConfig, // spread the configuration
      lng, // The locale we detected above
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

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const userAgent = request.headers.get("user-agent");

    const readyOption: keyof RenderToPipeableStreamOptions =
      (userAgent && isbot(userAgent)) || entryContext.isSpaMode
        ? "onAllReady"
        : "onShellReady";

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <ServerRouter context={entryContext} url={request.url} />
      </I18nextProvider>,
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) console.error(error);
        },
      },
    );

    setTimeout(abort, streamTimeout + 1000);
  });
}
