import React from "react";
import clsx from "clsx";
import type { MetaFunction } from "@remix-run/cloudflare";
import { AppShell, Button, Popover, TextInput } from "@rtdui/core";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { IconTranslate } from "~/src/asserts/IconTranslate";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { t, i18n } = useTranslation();
  const [langOpen, setLangOpen] = React.useState(false);
  const handleLangChange = (lang: string) => {
    setLangOpen(false);
    i18n.changeLanguage(lang);
  };
  return (
    <AppShell
      slots={{
        header: "sticky top-0 z-20 w-full bg-base-200 px-4",
        main: "relative z-0 pb-16",
        aside: "z-40",
      }}
      header={
        <div className="navbar gap-2">
          {/* logo */}
          <div className="lg:hidden">RTDUI</div>
          {/* 搜索框 */}
          <div className="flex-1 px-2 mx-2">
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
            {/* 语言切换 */}
            <Popover
              open={langOpen}
              onOpenChange={setLangOpen}
              transitionDuration={{ exit: 0 }}
            >
              <Popover.Trigger>
                <Button className="gap-0.5">
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
                      (en) English
                    </button>
                  </li>
                  <li>
                    <button
                      className={clsx({ active: i18n.language === "zh" })}
                      onClick={() => handleLangChange("zh")}
                    >
                      (zh) 简体中文
                    </button>
                  </li>
                </ul>
              </Popover.Dropdown>
            </Popover>
          </div>
        </div>
      }
      main={
        <div className="hero bg-base-200">
          <div className="hero-content">
            <div>
              <h1 className="text-5xl font-bold leading-tight">
                {t("rtdui.introduce")}
              </h1>
              <p className="py-6 text-xl">{t("rtdui.describe")}</p>
              <a href="/getting-started" className="btn btn-primary">
                {t("rtdui.get-started")}
              </a>
            </div>
            <img
              src="/photo-1414694762283-acccc27bca85.jpg"
              alt="hero"
              className="max-w-lg rounded-lg shadow-2xl"
            />
          </div>
        </div>
      }
    />
  );
}
