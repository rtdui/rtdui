import React from "react";
import { Affix, AppShell, Button, Kbd, TextInput } from "@rtdui/core";
import {
  IconBell,
  IconBrandFacebookFilled,
  IconBrandTwitterFilled,
  IconBrandYoutubeFilled,
  IconHash,
  IconHeart,
  IconMenu2,
  IconSearch,
} from "@tabler/icons-react";
import { dialogs } from "@rtdui/dialogs";
import { CodeHighlight } from "@rtdui/code-highlight";

const sourceCode = `
export default function AppShellDemo() {
  const ref = React.useRef<any>(null!);
  return (
    <AppShell
      ref={ref}
      slots={{
        body: "flex flex-col min-h-screen",
        main: "flex-1 p-8",
        drawer: "bg-base-300 w-56 h-screen",
      }}
      header={
        <div className="navbar gap-4 px-4 bg-base-200">
          <IconMenu2
            className="cursor-pointer lg:hidden"
            onClick={() => ref.current.toggle()}
          />
          <div className="flex-grow">
            <TextInput
              variant="ghost"
              leftSection={<IconSearch />}
              rightSectionWidth={72}
              rightSection={
                <>
                  <Kbd size="sm">Ctrl</Kbd>
                  <Kbd size="sm">K</Kbd>
                </>
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <Button sharp="circle">
              <IconBell />
            </Button>
            <Button sharp="circle">
              <IconHeart />
            </Button>
          </div>
        </div>
      }
      main={
        <div>
          Main Content.
          <p>(可以改变窗口大小或在开发人员工具中的设备仿真中查看响应式变化)</p>
          <Affix position={{ bottom: 100, right: 100 }}>
            <Button
              sharp="circle"
              color="primary"
              onClick={() =>
                dialogs.show({
                  content: <CodeHighlight code={sourceCode} />,
                  fullScreen: true,
                })
              }
            >
              源码
            </Button>
          </Affix>
        </div>
      }
      footer={
        <>
          <footer className="footer p-10 bg-base-200 text-base-content">
            <nav>
              <header className="footer-title">Services</header>
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
              <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
              <header className="footer-title">Company</header>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Jobs</a>
              <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
              <header className="footer-title">Legal</header>
              <a className="link link-hover">Terms of use</a>
              <a className="link link-hover">Privacy policy</a>
              <a className="link link-hover">Cookie policy</a>
            </nav>
          </footer>
          <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
            <aside className="items-center grid-flow-col">
              <IconHash size={32} />
              <p>
                ACME Industries Ltd. <br />
                Providing reliable tech since 1992
              </p>
            </aside>
            <nav className="md:place-self-center md:justify-self-end">
              <div className="grid grid-flow-col gap-4">
                <a>
                  <IconBrandTwitterFilled />
                </a>
                <a>
                  <IconBrandYoutubeFilled />
                </a>
                <a>
                  <IconBrandFacebookFilled />
                </a>
              </div>
            </nav>
          </footer>
        </>
      }
      drawer={
        <>
          <ul className="menu">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </>
      }
    />
  );
}
`;

export default function AppShellDemo() {
  const ref = React.useRef<any>(null!);
  return (
    <AppShell
      ref={ref}
      slots={{
        body: "flex flex-col min-h-screen",
        main: "flex-1 p-8",
        drawer: "bg-base-300 w-56 h-screen",
      }}
      header={
        <div className="navbar gap-4 px-4 bg-base-200">
          <IconMenu2
            className="cursor-pointer lg:hidden"
            onClick={() => ref.current.toggle()}
          />
          <div className="flex-grow">
            <TextInput
              variant="ghost"
              leftSection={<IconSearch />}
              rightSectionWidth={72}
              rightSection={
                <>
                  <Kbd size="sm">Ctrl</Kbd>
                  <Kbd size="sm">K</Kbd>
                </>
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <Button sharp="circle">
              <IconBell />
            </Button>
            <Button sharp="circle">
              <IconHeart />
            </Button>
          </div>
        </div>
      }
      main={
        <div>
          Main Content.
          <p>(可以改变窗口大小或在开发人员工具中的设备仿真中查看响应式变化)</p>
          <Affix position={{ bottom: 100, right: 100 }}>
            <Button
              sharp="circle"
              color="primary"
              onClick={() =>
                dialogs.show({
                  content: <CodeHighlight code={sourceCode} />,
                  fullScreen: true,
                })
              }
            >
              源码
            </Button>
          </Affix>
        </div>
      }
      footer={
        <>
          <footer className="footer p-10 bg-base-200 text-base-content">
            <nav>
              <header className="footer-title">Services</header>
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
              <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
              <header className="footer-title">Company</header>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Jobs</a>
              <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
              <header className="footer-title">Legal</header>
              <a className="link link-hover">Terms of use</a>
              <a className="link link-hover">Privacy policy</a>
              <a className="link link-hover">Cookie policy</a>
            </nav>
          </footer>
          <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
            <aside className="items-center grid-flow-col">
              <IconHash size={32} />
              <p>
                ACME Industries Ltd. <br />
                Providing reliable tech since 1992
              </p>
            </aside>
            <nav className="md:place-self-center md:justify-self-end">
              <div className="grid grid-flow-col gap-4">
                <a>
                  <IconBrandTwitterFilled />
                </a>
                <a>
                  <IconBrandYoutubeFilled />
                </a>
                <a>
                  <IconBrandFacebookFilled />
                </a>
              </div>
            </nav>
          </footer>
        </>
      }
      drawer=<ul className="menu">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
    />
  );
}
