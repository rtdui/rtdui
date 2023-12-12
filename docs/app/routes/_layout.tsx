import React from "react";
import clsx from "clsx";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import {
  IconMenu2,
  IconSun,
  IconMoon,
  IconSearch,
  IconChevronDown,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { json } from "@remix-run/cloudflare";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { usePrevious } from "@rtdui/hooks";
import { AppShell, Button, Popover, Tabs, TextInput } from "@rtdui/core";
import { useTranslation } from "react-i18next";
import ApiDoc from "~/src/Api";
import apidocs from "../.docgen/docgen.json";
import democodes from "../.docgen/codegen.json";
import NavMenu from "~/src/NavMenu";
import menuData from "~/src/menuData.json";
import { notifications } from "@rtdui/notifications";
import { IconTranslate } from "~/src/asserts/IconTranslate";

export const loader = async (args: ActionFunctionArgs) => {
  return json({ apidocs, democodes, menuData });
};

export default function DocLayout() {
  const toggleRef = React.useRef<any>(null!);
  const {
    apidocs: allComponentDoc,
    democodes,
    menuData,
  } = useLoaderData<typeof loader>();

  const handleThemeChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.checked) {
      document.documentElement.dataset.theme = "dark";
    } else {
      delete document.documentElement.dataset.theme;
    }
  };

  const tabsRef = React.useRef<any>(null!);

  const location = useLocation();

  const isComponentPage = location.pathname.includes("/components/");

  const componentName = location.pathname.split("/").reverse()[0];
  const componentRealName: any = Object.keys(allComponentDoc).find(
    (d) => d.toLowerCase() === componentName.toLowerCase()
  );
  const apiDoc = (allComponentDoc as any)[componentRealName];

  const preLocation = usePrevious(location.pathname);
  React.useEffect(() => {
    if (isComponentPage && location.pathname !== preLocation) {
      tabsRef.current.setIndex(0); // 页面切换重置tabs的激活索引
    }
  }, [location, preLocation, isComponentPage]);

  const { t, i18n } = useTranslation();
  const [langOpen, setLangOpen] = React.useState(false);
  const handleLangChange = (lang: string) => {
    setLangOpen(false);
    i18n.changeLanguage(lang);
  };

  React.useEffect(() => {
    if (i18n.language === "en") {
      notifications.show({
        icon: <IconAlertTriangle color="hsl(var(--wa))" />,
        content:
          "The current translation of the English document is incomplete",
        autoClose: false,
        color: "transparent",
      });
    } else {
      notifications.clean();
    }
  }, [i18n.language]);

  return (
    <AppShell
      ref={toggleRef}
      slots={{
        header: "sticky top-0 z-20 w-full bg-base-200 px-4",
        main: "relative z-0 prose max-w-none p-8 pb-16",
        aside: "z-30",
        drawer: "w-80 min-h-full bg-base-100",
      }}
      header={
        <div className="navbar gap-2">
          {/* 抽屉触发器 */}
          <div className="lg:hidden">
            <IconMenu2
              className="cursor-pointer lg:hidden"
              onClick={() => toggleRef.current.toggle()}
            />
          </div>
          <div className="flex-1">
            {/* 搜索框 */}
            <TextInput
              slots={{ input: "w-40" }}
              ghost
              bordered={false}
              leftSection={<IconSearch />}
              rightSection={
                <>
                  <kbd className="kbd kbd-sm opacity-50">ctrl</kbd>
                  <kbd className="kbd kbd-sm opacity-50 ml-0.5">k</kbd>
                </>
              }
              rightSectionWidth={74}
            />
          </div>
          <div className="flex items-center gap-1">
            {/* 主题切换 */}
            <label className="swap swap-rotate btn btn-ghost btn-circle">
              <input
                type="checkbox"
                onChange={handleThemeChange}
                className="opacity-0"
              />
              <IconSun className="swap-on" />
              <IconMoon className="swap-off" />
            </label>
            {/* 语言切换 */}
            <Popover
              open={langOpen}
              onOpenChange={setLangOpen}
              transitionDuration={{ exit: 0 }}
            >
              <Popover.Trigger>
                <Button sharp="square" className="gap-0.5">
                  <IconTranslate
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    stroke={1}
                    size={20}
                  />
                  <IconChevronDown size={14} stroke={2.5} color="gray" />
                </Button>
              </Popover.Trigger>
              <Popover.Dropdown>
                <ul className="menu menu-sm gap-1 bg-base-300 rounded-box">
                  <li>
                    <button
                      className={clsx({ active: i18n.language === "en" })}
                      onClick={() => handleLangChange("en")}
                    >
                      {t("lang.en")}
                    </button>
                  </li>
                  <li>
                    <button
                      className={clsx({ active: i18n.language === "zh" })}
                      onClick={() => handleLangChange("zh")}
                    >
                      {t("lang.zh")}
                    </button>
                  </li>
                </ul>
              </Popover.Dropdown>
            </Popover>
          </div>
        </div>
      }
      main={
        isComponentPage ? (
          <Tabs ref={tabsRef}>
            <Tabs.TabPanel label="文档">
              <Outlet context={democodes} />
            </Tabs.TabPanel>
            <Tabs.TabPanel label="组件属性">
              <ApiDoc apiDoc={apiDoc} />
            </Tabs.TabPanel>
          </Tabs>
        ) : (
          <Outlet />
        )
      }
      drawer={
        <>
          <div className="h-16 bg-base-200 flex items-center p-4 sticky top-0 z-20">
            RTD UI
          </div>
          <NavMenu data={menuData} onClick={() => toggleRef.current.toggle()} />
        </>
      }
    />
  );
}
