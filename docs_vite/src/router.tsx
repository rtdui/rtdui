import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import Index from "./routes/_index";
import Layout from "./routes/_layout";

const allMdxInDemos = import.meta.glob("./demos/**/*.mdx");

const demosRoutes: any[] = Object.entries(allMdxInDemos).map((d) => {
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

const allMdxInRoutes = import.meta.glob("./routes/**/*.mdx");
const layoutRoutes: any[] = Object.entries(allMdxInRoutes)
  .filter((d) => {
    const first = d[0].split("/").at(-1)?.split(".").at(0);
    return first === "_layout";
  })
  .map((d) => {
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

const allLayoutRoutes = [...layoutRoutes, ...demosRoutes];

const allTsx = import.meta.glob("./routes/**/*.tsx");
const nolayoutRoutes: any[] = Object.entries(allTsx)
  .filter((d) => {
    const first = d[0].split("/").at(-1)?.split(".").at(0);
    return first !== "_layout" && first !== "_index" && first !== "root";
  })
  .map((d) => {
    const path = `${d[0].split("/").at(2)?.split(".").at(-2)}`;
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
    children: [
      // 首页
      { index: true, element: <Index /> },
      ...nolayoutRoutes,
      {
        element: <Layout />,
        children: allLayoutRoutes,
        // children: [
        //   {
        //     path: "install",
        //     lazy: () => import(`./routes/${route}.tsx`),
        //   },
        // ],
      },
    ],
  },
]);
