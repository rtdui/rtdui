import ReactDOMServer from "react-dom/server";
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from "react-router-dom/server";
import { i18n, createInstance } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import Backend from "i18next-fs-backend";
import { resolve } from "node:path";
import i18nConfig from "./i18n/config";
import { routes } from "./router";

export async function render(url: string) {
  const instance = createInstance() as i18n;
  const lng = "zh";

  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .use(Backend) // Setup our backend
    .init({
      ...i18nConfig, // spread the configuration
      lng, // The locale we detected above
      ns: ["translation"], // The namespaces the routes about to render wants to use
      backend: { loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json") },
    });

  const handler = createStaticHandler(routes);
  const context: any = await handler.query(
    new Request(`http://localhost${url}`, { method: "get" })
  );

  const router = createStaticRouter(handler.dataRoutes, context);

  return ReactDOMServer.renderToString(
    <I18nextProvider i18n={instance}>
      <StaticRouterProvider router={router} context={context} />
    </I18nextProvider>
  );
}
