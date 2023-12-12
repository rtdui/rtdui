/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

// import { PassThrough } from "node:stream";

import type { AppLoadContext, EntryContext } from "@remix-run/cloudflare";
// import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import {
  // renderToPipeableStream,
  renderToReadableStream,
} from "react-dom/server";

import { i18n, createInstance } from "i18next";
import remixI18next from "./src/i18next.server";
import { I18nextProvider, initReactI18next } from "react-i18next";
// import Backend from "i18next-fs-backend";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nConfig from "./src/i18n"; // your i18n configuration file
// import { resolve } from "path";

import enCommon from "../public/locales/en/translation.json";
import zhCommon from "../public/locales/zh/translation.json";

/** 由于cloudflare不是nodejs运行时,因此不支持fs后端, 使用内存资源作为后端替代 */
const langResource = {
  en: {
    translation: enCommon,
  },
  zh: {
    translation: zhCommon,
  },
};

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  const instance = createInstance() as i18n;
  const lng = await remixI18next.getLocale(request);
  let ns = remixI18next.getRouteNamespaces(remixContext);
  ns = ns.length === 0 ? ["translation"] : ns;

  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .use(resourcesToBackend(langResource)) // Setup our backend
    .init({
      ...i18nConfig, // spread the configuration
      lng, // The locale we detected above
      ns, // The namespaces the routes about to render wants to use
      // backend: { loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json") },
    });

  const body = await renderToReadableStream(
    <I18nextProvider i18n={instance}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>,
    {
      signal: request.signal,
      onError(error: unknown) {
        // Log streaming rendering errors from inside the shell
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );

  if (isbot(request.headers.get("user-agent"))) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

// const ABORT_DELAY = 5_000;

// export default async function handleRequest(
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext,
//   loadContext: AppLoadContext
// ) {
//   const instance = createInstance() as i18n;
//   const lng = await remixI18next.getLocale(request);
//   let ns = remixI18next.getRouteNamespaces(remixContext);
//   ns = ns.length === 0 ? ["translation"] : ns;

//   await instance
//     .use(initReactI18next) // Tell our instance to use react-i18next
//     .use(Backend) // Setup our backend
//     .init({
//       ...i18nConfig, // spread the configuration
//       lng, // The locale we detected above
//       ns, // The namespaces the routes about to render wants to use
//       backend: { loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json") },
//     });

//   const callbackName = isbot(request.headers.get("user-agent"))
//     ? "onAllReady"
//     : "onShellReady";

//   return new Promise((resolve, reject) => {
//     let shellRendered = false;
//     const { pipe, abort } = renderToPipeableStream(
//       <I18nextProvider i18n={instance}>
//         <RemixServer
//           context={remixContext}
//           url={request.url}
//           abortDelay={ABORT_DELAY}
//         />
//       </I18nextProvider>,
//       {
//         [callbackName]: () => {
//           shellRendered = true;
//           const body = new PassThrough();
//           const stream = createReadableStreamFromReadable(body);

//           responseHeaders.set("Content-Type", "text/html");

//           resolve(
//             new Response(stream, {
//               headers: responseHeaders,
//               status: responseStatusCode,
//             })
//           );

//           pipe(body);
//         },
//         onShellError(error: unknown) {
//           reject(error);
//         },
//         onError(error: unknown) {
//           responseStatusCode = 500;
//           // Log streaming rendering errors from inside the shell.  Don't log
//           // errors encountered during initial shell rendering since they'll
//           // reject and get logged in handleDocumentRequest.
//           if (shellRendered) {
//             console.error(error);
//           }
//         },
//       }
//     );

//     setTimeout(abort, ABORT_DELAY);
//   });
// }

// function handleBotRequest(
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext
// ) {
//   return new Promise((resolve, reject) => {
//     let shellRendered = false;
//     const { pipe, abort } = renderToPipeableStream(
//       <RemixServer
//         context={remixContext}
//         url={request.url}
//         abortDelay={ABORT_DELAY}
//       />,
//       {
//         onAllReady() {
//           shellRendered = true;
//           const body = new PassThrough();
//           const stream = createReadableStreamFromReadable(body);

//           responseHeaders.set("Content-Type", "text/html");

//           resolve(
//             new Response(stream, {
//               headers: responseHeaders,
//               status: responseStatusCode,
//             })
//           );

//           pipe(body);
//         },
//         onShellError(error: unknown) {
//           reject(error);
//         },
//         onError(error: unknown) {
//           responseStatusCode = 500;
//           // Log streaming rendering errors from inside the shell.  Don't log
//           // errors encountered during initial shell rendering since they'll
//           // reject and get logged in handleDocumentRequest.
//           if (shellRendered) {
//             console.error(error);
//           }
//         },
//       }
//     );

//     setTimeout(abort, ABORT_DELAY);
//   });
// }

// function handleBrowserRequest(
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext
// ) {
//   return new Promise((resolve, reject) => {
//     let shellRendered = false;
//     const { pipe, abort } = renderToPipeableStream(
//       <RemixServer
//         context={remixContext}
//         url={request.url}
//         abortDelay={ABORT_DELAY}
//       />,
//       {
//         onShellReady() {
//           shellRendered = true;
//           const body = new PassThrough();
//           const stream = createReadableStreamFromReadable(body);

//           responseHeaders.set("Content-Type", "text/html");

//           resolve(
//             new Response(stream, {
//               headers: responseHeaders,
//               status: responseStatusCode,
//             })
//           );

//           pipe(body);
//         },
//         onShellError(error: unknown) {
//           reject(error);
//         },
//         onError(error: unknown) {
//           responseStatusCode = 500;
//           // Log streaming rendering errors from inside the shell.  Don't log
//           // errors encountered during initial shell rendering since they'll
//           // reject and get logged in handleDocumentRequest.
//           if (shellRendered) {
//             console.error(error);
//           }
//         },
//       }
//     );

//     setTimeout(abort, ABORT_DELAY);
//   });
// }
