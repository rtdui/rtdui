import { cssBundleHref } from "@remix-run/css-bundle";
import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import styles from "~/tailwind.css";
import { Notifications } from "@rtdui/notifications";
import { Dialogs } from "@rtdui/dialogs";

import { useChangeLanguage } from "remix-i18next";
import i18next from "~/src/i18next.server";

export const links: LinksFunction = () => [
  // ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request);
  return json({ locale });
}

/**
 * body层的z-index层次划分: App抽屉边栏: 30, AppBar: 20, 对话框Portal: 40, 通知Portal: 50, 其它Portal: 10, main: 0
 */
export default function App() {
  // Get the locale from the loader
  const { locale } = useLoaderData<typeof loader>();
  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/katex.min.css" rel="stylesheet" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans">
        <Dialogs />
        <Notifications />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
