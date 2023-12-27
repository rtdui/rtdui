import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import { Notifications } from "@rtdui/notifications";
import { Dialogs } from "@rtdui/dialogs";
import { Spotlight } from "@rtdui/spotlight";
import menuData from "../assets/menuData.json";

/**
 * body层的z-index层次划分: AppShell: 0, Spotlight(Portal): 30, 对话框(Portal): 40, 通知(Portal): 50, 其它Portal: 10
 *
 * AppShell中: 抽屉边栏: 30, header: 20, main: 0, footer: auto
 */
export default function Root() {
  const navigate = useNavigate();

  return (
    <>
      <ScrollRestoration />
      <Dialogs />
      <Notifications />
      <Spotlight
        nothingFound="未找到内容"
        limit={5}
        highlightQuery
        actions={menuData
          .flatMap((d) => d.items)
          .map((d) => ({
            id: d.label,
            label: d.label,
            onClick: () => navigate(d.url),
          }))}
      />
      <Outlet />
    </>
  );
}
