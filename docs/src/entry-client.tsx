import React, { startTransition } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  matchRoutes,
} from "react-router-dom";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import httpBackend from "i18next-http-backend";
import i18nConfig from "./i18n/config";
import { routes } from "./router";
import "./tailwind.css";

async function init() {
  //#region 消除route.lazy防止router fallback
  // Determine if any of the initial routes are lazy
  const lazyMatches = matchRoutes(routes, window.location)?.filter(
    (m: any) => m.route.lazy
  );

  // Load the lazy matches and update the routes before creating your router
  // so we can hydrate the SSR-rendered content synchronously
  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m: any) => {
        const routeModule = await m.route.lazy();
        Object.assign(m.route, {
          ...routeModule,
          lazy: undefined,
        });
      })
    );
  }
  //#endregion 消除route.lazy防止router fallback
  const router = createBrowserRouter(routes);

  await i18next
    .use(initReactI18next) // Tell i18next to use the react-i18next plugin
    .use(LanguageDetector) // Setup a client-side language detector
    .use(httpBackend) // Setup your backend
    .init({
      ...i18nConfig, // spread the configuration
      // This function detects the namespaces your routes rendered while SSR use
      ns: ["translation"],
      backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
      detection: {
        // order and from where user language should be detected
        order: [
          "querystring",
          "cookie",
          "localStorage",
          "sessionStorage",
          "navigator",
          "htmlTag",
          "path",
          "subdomain",
        ],
        convertDetectedLanguage: (lng) => lng.split("-")[0],
      },
    });
  startTransition(() => {
    // 开发时使用SPA
    if (import.meta.env.DEV) {
      ReactDOM.createRoot(document.getElementById("root")!).render(
        <I18nextProvider i18n={i18next}>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </I18nextProvider>
      );
    }
    // 部署时使用SSR构建SSG
    else {
      ReactDOM.hydrateRoot(
        document.getElementById("root")!,
        <I18nextProvider i18n={i18next}>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </I18nextProvider>
      );
    }
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(init);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(init, 1);
}
