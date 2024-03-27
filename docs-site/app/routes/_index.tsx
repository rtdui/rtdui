import React from "react";
import clsx from "clsx";
import { AppShell, Button, Popover, StatPanel, TextInput } from "@rtdui/core";
import {
  IconBrandGithub,
  IconBrandTailwind,
  IconChevronDown,
  IconExternalLink,
  IconHash,
  IconLifebuoy,
  IconScale,
  IconSearch,
} from "@tabler/icons-react";
import { spotlight } from "@rtdui/spotlight";
import { useTranslation } from "react-i18next";
import { IconTranslate } from "../src/assets/IconTranslate";

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
            >
              <IconBrandGithub />
            </a>
            {/* 语言切换 */}
            <Popover
              open={langOpen}
              onOpenChange={setLangOpen}
              transitionDuration={{ exit: 0 }}
            >
              <Popover.Trigger>
                <Button ghost sharp="square" className="gap-0.5">
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
        <div>
          <div className="hero bg-base-200">
            <div className="hero-content text-center">
              <div>
                <div className="grid">
                  <h1 className="row-start-1 col-start-1 p-8 text-8xl font-bold leading-tight bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_20%,theme(colors.secondary)_40%,theme(colors.primary)_60%,theme(colors.accent)_80%)] [-webkit-text-fill-color:transparent] bg-clip-text blur-xl pointer-events-none">
                    RTDUI
                  </h1>
                  <h1 className="row-start-1 col-start-1 p-8 text-8xl font-bold leading-tight bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_20%,theme(colors.secondary)_40%,theme(colors.primary)_60%,theme(colors.accent)_80%)] [-webkit-text-fill-color:transparent] bg-clip-text">
                    RTDUI
                  </h1>
                </div>
                <h1 className="text-3xl font-bold leading-tight">
                  {t("rtdui.introduce")}
                </h1>
                <p className="py-6 text-xl">{t("rtdui.describe")}</p>
                <div className="flex justify-center gap-8">
                  <a
                    href="/getting-started"
                    className="btn btn-primary min-w-[140px]"
                  >
                    {t("rtdui.get-started")}
                  </a>
                  <a
                    href="https://github.com/rtdui/rtdui"
                    className="btn btn-neutral min-w-[140px]"
                    target="_blank"
                  >
                    <IconBrandGithub />
                    github
                    <IconExternalLink size={18} />
                  </a>
                </div>
              </div>
              {/* <img
                src="/photo-1414694762283-acccc27bca85.jpg"
                alt="hero"
                className="max-w-lg rounded-lg shadow-2xl"
              /> */}
            </div>
          </div>
          <section className="p-8 flex flex-col md:flex-row gap-8">
            <div className="flex gap-4 flex-row md:flex-col">
              <IconScale size={40} className="stroke-primary" />
              <div>
                <div className="font-bold">{t("rtdui.freeAndOpenSource")}</div>
                <div className="text-sm">
                  {t("rtdui.freeAndOpenSource-desc")}
                </div>
              </div>
            </div>
            <div className="flex gap-4 flex-row md:flex-col">
              <IconLifebuoy size={40} className="stroke-primary" />
              <div>
                <div className="font-bold">{t("rtdui.typescript-based")}</div>
                <div className="text-sm">
                  {t("rtdui.typescript-based-desc")}
                </div>
              </div>
            </div>
            <div className="flex gap-4 flex-row md:flex-col">
              <IconBrandTailwind size={40} className="stroke-primary" />
              <div>
                <div className="font-bold">{t("rtdui.tailwindCSS-based")}</div>
                <div className="text-sm">
                  {t("rtdui.tailwindCSS-based-desc")}
                </div>
              </div>
            </div>
          </section>
          <section className="p-8">
            <div className="text-4xl font-bold my-8">
              {t("rtdui.nearly-100-components")}
            </div>
            <div className="mt-4 flex flex-col items-start gap-8">
              <StatPanel
                slots={{ value: "text-2xl" }}
                items={[
                  {
                    title: "hooks package",
                    value: "hooks",
                    desc: "extends mantine hooks",
                  },
                  {
                    title: "core package",
                    value: "core",
                    desc: "50+ components",
                  },
                ]}
              />
              <StatPanel
                slots={{ value: "text-2xl" }}
                items={[
                  { title: "editor package", value: "editor" },
                  {
                    title: "code-highlight package",
                    value: "highlight",
                  },
                  {
                    title: "datatable package",
                    value: "data table",
                  },
                  {
                    title: "qr-code package",
                    value: "qr code",
                  },
                ]}
              />
              <StatPanel
                slots={{ value: "text-2xl" }}
                items={[
                  {
                    title: "dialogs package",
                    value: "dialogs",
                  },
                  { title: "notifications package", value: "notifications" },
                ]}
              />
            </div>
          </section>
          <section className="p-8">
            <div className="text-4xl font-bold my-8">
              {t("rtdui.framework-support")}
            </div>
            <span className="text-xl">{t("rtdui.framework-support-desc")}</span>
            <div className="mt-4 flex flex-wrap justify-center items-center gap-8">
              <a className="flex flex-col justify-between min-w-[12rem] items-center border rounded p-4 h-32">
                <div className="">
                  <svg
                    className="w-24"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    viewBox="0 0 512 309"
                    data-large="true"
                  >
                    <path
                      fill="currentColor"
                      d="M120.81 80.561h96.568v7.676h-87.716v57.767h82.486v7.675h-82.486v63.423h88.722v7.675H120.81V80.561zm105.22 0h10.26l45.467 63.423L328.23 80.56 391.441 0l-103.85 150.65 53.515 74.127h-10.663l-48.686-67.462-48.888 67.462h-10.461l53.917-74.128-50.296-70.088zm118.898 7.676V80.56h110.048v7.676h-50.699v136.54h-8.852V88.237h-50.497zM0 80.56h11.065l152.58 228.323-63.053-84.107L9.254 91.468l-.402 133.31H0V80.56zm454.084 134.224c-1.809 0-3.165-1.4-3.165-3.212 0-1.81 1.356-3.212 3.165-3.212 1.83 0 3.165 1.401 3.165 3.212 0 1.811-1.335 3.212-3.165 3.212zm8.698-8.45h4.737c.064 2.565 1.937 4.29 4.693 4.29 3.079 0 4.823-1.854 4.823-5.325v-21.99h4.823v22.011c0 6.252-3.617 9.853-9.603 9.853-5.62 0-9.473-3.493-9.473-8.84zm25.384-.28h4.78c.409 2.953 3.294 4.828 7.45 4.828 3.875 0 6.717-2.005 6.717-4.764 0-2.371-1.809-3.794-5.921-4.764l-4.005-.97c-5.62-1.316-8.181-4.032-8.181-8.602 0-5.54 4.521-9.227 11.303-9.227 6.308 0 10.916 3.686 11.196 8.925h-4.694c-.452-2.867-2.95-4.657-6.567-4.657-3.81 0-6.35 1.833-6.35 4.635 0 2.22 1.635 3.493 5.683 4.441l3.423.841c6.373 1.488 9 4.075 9 8.753 0 5.95-4.607 9.68-11.97 9.68-6.89 0-11.52-3.558-11.864-9.12z"
                    ></path>
                  </svg>
                </div>
                <div className="">Next.js</div>
              </a>
              <a className="flex flex-col justify-between min-w-[12rem] items-center border rounded p-4 h-32">
                <div className="">
                  <svg
                    className="w-14"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    viewBox="0 0 256 257"
                  >
                    <defs>
                      <linearGradient
                        id="vite-a-:Rlequulu6:"
                        x1="-.828%"
                        x2="57.636%"
                        y1="7.652%"
                        y2="78.411%"
                      >
                        <stop offset="0%" stopColor="#41D1FF"></stop>
                        <stop offset="100%" stopColor="#BD34FE"></stop>
                      </linearGradient>
                      <linearGradient
                        id="vite-b-:Rlequulu6:"
                        x1="43.376%"
                        x2="50.316%"
                        y1="2.242%"
                        y2="89.03%"
                      >
                        <stop offset="0%" stopColor="#FFEA83"></stop>
                        <stop offset="8.333%" stopColor="#FFDD35"></stop>
                        <stop offset="100%" stopColor="#FFA800"></stop>
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#vite-a-:Rlequulu6:)"
                      d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 002.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62z"
                    ></path>
                    <path
                      fill="url(#vite-b-:Rlequulu6:)"
                      d="M185.432.063L96.44 17.501a3.268 3.268 0 00-2.634 3.014l-5.474 92.456a3.268 3.268 0 003.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028 72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113z"
                    ></path>
                  </svg>
                </div>
                <div className="">Vite</div>
              </a>
              <a className="flex flex-col justify-between min-w-[12rem] items-center border rounded p-4 h-32">
                <div className="flex-grow flex items-center">
                  <svg
                    className="w-24"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    viewBox="0 0 512 128"
                    data-large="true"
                  >
                    <path
                      fill="currentColor"
                      d="M404.472 38.335v89.493h-32.264V38.335h32.264zm41.606-.176l14.738 21.27 15.136-21.27h33.26l-32.264 42.54L512 127.653h-35.65l-17.724-24.28-17.726 24.28h-33.26l34.853-45.55L410.43 38.16h35.65zm-116.09-2.827c24.252 0 31.522 16.717 31.665 35.158l.002.56v56.184H329.39V79.313l-.006-.72-.01-.707-.018-.693-.023-.678a63.244 63.244 0 00-.014-.334l-.033-.657a53.255 53.255 0 00-.04-.643l-.046-.629a44.966 44.966 0 00-.026-.309l-.058-.608-.065-.593c-.915-7.718-3.901-11.725-11.61-11.725-9.142 0-13.103 6.379-14.086 16.549l-.064.724c-.12 1.46-.18 2.996-.189 4.598l-.001 44.346h-32.264V79.678l-.003-.727c0-.12-.002-.24-.003-.359l-.012-.706-.018-.693-.025-.678-.032-.664a54.24 54.24 0 00-.018-.327l-.043-.643-.05-.629-.057-.615c-.838-8.303-3.885-12.62-11.888-12.62-10.45 0-14.263 8.653-14.338 21.87l-.001 44.347h-32.264V37.74h32.264v13.444c4.78-9.832 14.34-15.852 27.683-15.852 15.734 0 23.899 7.224 27.684 17.658 4.78-10.033 15.335-17.658 30.271-17.658zm-170.42-2.827c29.38 0 45.093 20.06 45.405 44.02l.004.728v9.029H142.64c.797 11.036 8.764 16.253 18.522 16.253 8.65 0 14.195-2.931 17.21-9.76l.117-.272 25.891 2.407c-4.58 20.468-20.912 31.905-44.413 31.905-28.48 0-48.794-17.257-48.794-45.75 0-28.293 20.713-48.56 48.396-48.56zM60.366 0c32.541 0 48.712 15.488 48.712 40.228 0 18.505-11.38 30.573-26.752 32.585 12.977 2.615 20.563 10.057 21.96 24.74l.203 2.7.177 2.524.152 2.362.106 1.78.114 2.1.06 1.2.083 1.904.068 1.8.034 1.033.045 1.657.04 1.894.014.916.025 2.652.008 2.768.001 1.655H71.857c0-.698.006-1.37.014-2.03l.02-1.306.058-3.164.015-1.06.01-1.097.001-.566-.001-1.063-.01-1.115-.014-.876-.027-1.225-.04-1.3-.054-1.381-.068-1.472-.04-.772-.069-1.207-.079-1.268-.122-1.792-.106-1.424C70.417 88.912 65 85.186 55.093 84.73l-.646-.025-.658-.016a54.423 54.423 0 00-.67-.008L0 84.68V58.33h54.376c14.374 0 21.56-4.406 21.56-16.072 0-10.258-7.186-16.475-21.56-16.475H0V0h60.365zM35.483 106.855c4.402 0 6.245 2.445 6.9 4.785l.071.27.032.133.055.267.047.263.02.13.033.257.025.252.01.123.013.243.004.118.003.23v12.572H0v-19.643h35.483zM159.17 55.782c-8.078 0-12.642 3.906-14.826 9.625l-.164.443-.154.45c-.15.454-.285.918-.408 1.39l-.118.477c-.075.32-.145.642-.21.97l-.092.492c-.015.083-.03.166-.043.249l-.08.5-.037.253h31.268c-.399-8.027-5.577-14.85-15.136-14.85zm245.5-54.369v28.494H372.01V1.413h32.662z"
                    ></path>
                  </svg>
                </div>
                <div className="">Remix</div>
              </a>
            </div>
          </section>
        </div>
      }
      footer={
        <footer className="footer p-10 bg-base-200 text-base-content">
          <aside>
            <IconHash size={40} />
            <p>RTDUI</p>
            <p>{t("rtdui.describe")}</p>
          </aside>
          <nav>
            <header className="footer-title">{t("rtdui.about")}</header>
            <a
              className="link link-hover"
              href="https://rtdui.com/getting-started"
            >
              {t("rtdui.about")} RTDUI
            </a>
          </nav>
          <nav>
            <header className="footer-title">{t("rtdui.community")}</header>
            <a
              className="link link-hover"
              href="https://github.com/rtdui/rtdui"
            >
              {t("rtdui.follow")} Github
            </a>
            <a
              className="link link-hover"
              href="https://github.com/rtdui/rtdui/discussions"
            >
              GitHub {t("rtdui.discussions")}
            </a>
          </nav>
          <nav>
            <header className="footer-title">{t("rtdui.project")}</header>
            <a className="link link-hover" href="/getting-started">
              {t("rtdui.documentation")}
            </a>
            <a className="link link-hover" href="https://github.com/rtdui">
              Github {t("rtdui.organization")}
            </a>
            <a
              className="link link-hover"
              href="https://www.npmjs.com/org/rtdui"
            >
              npm {t("rtdui.organization")}
            </a>
          </nav>
        </footer>
      }
    />
  );
}
