import React from "react";
import clsx from "clsx";
import { Outlet, useLocation } from "react-router-dom";
import {
  IconMenu2,
  IconSun,
  IconMoon,
  IconSearch,
  IconChevronDown,
  IconAlertTriangle,
  IconBrandGithub,
  IconDeviceDesktop,
} from "@tabler/icons-react";
import { usePrevious } from "@rtdui/hooks";
import { notifications } from "@rtdui/notifications";
import { AppShell, Button, Popover, Swap, Tabs, TextInput } from "@rtdui/core";
import { useTranslation } from "react-i18next";
import { spotlight } from "@rtdui/spotlight";
import ApiDoc from "../src/components/Api";
import NavMenu from "../src/components/NavMenu";
import apidocs from "../src/assets/docgen.json";
import democodes from "../src/assets/codegen.json";
import menuData from "../src/assets/menuData.json";
import { IconTranslate } from "../src/assets/IconTranslate";
import "katex/dist/katex.css";
import { Link } from "@remix-run/react";

export default function Layout() {
  const toggleRef = React.useRef<any>(null!);

  const handleThemeChange = (theme: "system" | "light" | "dark") => {
    switch (theme) {
      case "light":
        document.documentElement.dataset.theme = "light";
        setTheme("light");
        break;
      case "dark":
        document.documentElement.dataset.theme = "dark";
        setTheme("dark");
        break;
      default:
        delete document.documentElement.dataset.theme;
        setTheme("system");
        break;
    }
    setThemeOpened(false);
  };

  const tabsRef = React.useRef<any>(null!);

  const location = useLocation();

  const isComponentPage = location.pathname.includes("/components/");

  const componentName = location.pathname.split("/").reverse()[0];
  const componentRealName: any = Object.keys(apidocs).find(
    (d) => d.toLowerCase().split("/").at(-1)! === componentName.toLowerCase()
  );
  const apiDoc = (apidocs as any)[componentRealName];

  const preLocation = usePrevious(location.pathname);
  React.useEffect(() => {
    if (isComponentPage && location.pathname !== preLocation) {
      tabsRef.current.setCurrentTab("文档"); // 页面切换重置tabs的激活索引
    }
  }, [location, preLocation, isComponentPage]);

  const { t, i18n } = useTranslation();
  const [langOpened, setLangOpened] = React.useState(false);
  const [themeOpened, setThemeOpened] = React.useState(false);
  const [theme, setTheme] = React.useState("system");
  const handleLangChange = (lang: string) => {
    setLangOpened(false);
    i18n.changeLanguage(lang);
  };

  React.useEffect(() => {
    if (i18n.language === "en") {
      notifications.show({
        icon: <IconAlertTriangle color="oklch(var(--wa))" />,
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
      className="z-0"
      slots={{
        header: "sticky top-0 z-20 w-full bg-base-200 px-4",
        main: "relative z-0 prose max-w-none p-8 pb-16",
        side: "z-30",
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
              variant="ghost"
              leftSection={<IconSearch />}
              rightSection={
                <>
                  <kbd className="kbd kbd-sm opacity-50">ctrl</kbd>
                  <kbd className="kbd kbd-sm opacity-50 ml-0.5">k</kbd>
                </>
              }
              rightSectionWidth={74}
              onMouseDown={(e) => {
                spotlight.open();
                e.preventDefault();
              }}
            />
          </div>
          <div className="flex items-center gap-1">
            {/* github */}
            <a
              className="btn btn-ghost btn-circle"
              href="https://github.com/rtdui/rtdui"
              target="_blank"
              rel="noreferrer"
            >
              <IconBrandGithub />
            </a>
            {/* 主题切换 */}
            <Popover opened={themeOpened} onChange={setThemeOpened}>
              <Popover.Target>
                <Button
                  sharp="square"
                  ghost
                  className="gap-px"
                  onClick={() => setThemeOpened(true)}
                >
                  <IconSun />
                  <IconChevronDown size={14} stroke={2.5} color="gray" />
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <ul className="menu menu-sm gap-1">
                  <li>
                    <button
                      className={clsx({ active: theme === "system" })}
                      onClick={() => handleThemeChange("system")}
                    >
                      <IconDeviceDesktop size={20} />
                      System
                    </button>
                  </li>
                  <li>
                    <button
                      className={clsx({ active: theme === "light" })}
                      onClick={() => handleThemeChange("light")}
                    >
                      <IconSun size={20} />
                      Light
                    </button>
                  </li>
                  <li>
                    <button
                      className={clsx({ active: theme === "dark" })}
                      onClick={() => handleThemeChange("dark")}
                    >
                      <IconMoon size={20} />
                      Dark
                    </button>
                  </li>
                </ul>
              </Popover.Dropdown>
            </Popover>
            {/* 语言切换 */}
            <Popover opened={langOpened} onChange={setLangOpened}>
              <Popover.Target>
                <Button
                  sharp="square"
                  ghost
                  className="gap-0.5"
                  onClick={() => setLangOpened(true)}
                >
                  <IconTranslate
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    stroke={1}
                    size={20}
                  />
                  <IconChevronDown size={14} stroke={2.5} color="gray" />
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <ul className="menu menu-sm gap-1">
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
          <Tabs defaultValue="文档" variant="outline" ref={tabsRef}>
            <Tabs.List>
              <Tabs.Tab value="文档">文档</Tabs.Tab>
              <Tabs.Tab value="组件属性">组件属性</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="文档" className="py-4">
              <Outlet context={democodes} />
            </Tabs.Panel>
            <Tabs.Panel value="组件属性" className="py-4">
              <ApiDoc apiDoc={apiDoc} />
            </Tabs.Panel>
          </Tabs>
        ) : (
          <Outlet />
        )
      }
      drawer={
        <>
          <div className="h-16 bg-base-200 flex items-center p-4 sticky top-0 z-20">
            <a href="/" className="flex-1">
              RTD UI
            </a>
            <Link to="/changelog" className="link">
              v4.8.4
            </Link>
          </div>
          <NavMenu
            data={menuData as any}
            onClick={() => toggleRef.current.toggle()}
          />
        </>
      }
    />
  );
}
