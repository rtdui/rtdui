import Root from "./routes/root";
import Index from "./routes/_index";
import Layout from "./routes/_layout";

const allMdxInDemos = import.meta.glob("./demos/**/*.mdx");
const demosRoutesInLayout: any[] = Object.entries(allMdxInDemos).map((d) => {
  const path = `components/${d[0].split("/").at(-2)}`;
  const lazy = async () => {
    const module: any = await d[1]();
    return {
      Component: module.default,
      element: module.element,
      ErrorBoundary: module.ErrorBoundary,
      errorElement: module.errorElement,
      loader: module.loader,
      action: module.action,
    };
  };

  return { path, lazy };
});

const allMdxInLayout = import.meta.glob("./routes/**/_layout.*.mdx");
const routesInLayout: any[] = Object.entries(allMdxInLayout).map((d) => {
  const path = `${d[0].split("/").at(-1)?.split(".").at(-2)}`;
  const lazy = async () => {
    const module: any = await d[1]();
    return {
      Component: module.default,
      element: module.element,
      ErrorBoundary: module.ErrorBoundary,
      errorElement: module.errorElement,
      loader: module.loader,
      action: module.action,
    };
  };

  return { path, lazy };
});

const allRoutesInLayout = [...routesInLayout, ...demosRoutesInLayout];

const allTsxInRoot = import.meta.glob("./routes/**/root.*.tsx");
const routesInRoot: any[] = Object.entries(allTsxInRoot).map((d) => {
  const path = `${d[0].split("/").at(-1)?.split(".").at(-2)}`;
  const lazy = async () => {
    const module: any = await d[1]();
    return {
      Component: module.default,
      element: module.element,
      ErrorBoundary: module.ErrorBoundary,
      errorElement: module.errorElement,
      loader: module.loader,
      action: module.action,
    };
  };

  return { path, lazy };
});

export const routes = [
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
    children: [
      // 首页
      { index: true, element: <Index /> },
      ...routesInRoot,
      {
        element: <Layout />,
        children: allRoutesInLayout,
        // children: [
        //   {
        //     path: "install",
        //     lazy: () => import(`./routes/${route}.tsx`),
        //   },
        // ],
      },
    ],
  },
];
