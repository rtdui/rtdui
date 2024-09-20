import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "@remix-run/react";
import tailwindHref from "./tailwind.css?url";
import { Notifications } from "@rtdui/notifications";
import { Dialogs } from "@rtdui/dialogs";
import { Spotlight } from "@rtdui/spotlight";
import menuData from "./src/assets/menuData.json";
import { NProgress } from "./src/components/NProgress";

// 不建议使用Vite的副作用导入:`import "./tailwind.css";` 这是因为在SSR模式下, 开发时Vite会往head中注入两次样式. 一次是在SSR时, 还有一次在客户端水合时.
export const links = () => [
  { rel: "stylesheet", href: tailwindHref },
  { rel: "icon", type: "image/svg+xml", href: "/rtdui.svg" },
];

export const meta = () => [{ title: "RTDUI" }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1, maximum-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const navigate = useNavigate();
  return (
    <>
      <NProgress />
      <Dialogs dirtyWarningLabel="内容已修改，关闭会丢失未保存的数据，确定要关闭吗？" />
      <Notifications />
      <Spotlight
        nothingFound="未找到内容"
        limit={5}
        highlightQuery
        actions={menuData.map((d) => {
          const actions = d.items.map((dd) => ({
            id: dd.label,
            label: dd.label,
            // description: dd.label,
            onClick: () => navigate(dd.url),
          }));
          return { group: d.group, actions };
        })}
      />
      <Outlet />
    </>
  );
}

export function HydrateFallback() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="skeleton h-32"></div>
      <div className="skeleton h-4 "></div>
      <div className="skeleton h-4"></div>
      <div className="skeleton h-4"></div>
    </div>
  );
}
