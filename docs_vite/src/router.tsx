import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import Index from "./routes/index";
import Layout, { loader as layoutLoader } from "./routes/layout";

const demos = import.meta.glob("./demos/**/*.mdx");

const demosRoutes: any[] = Object.entries(demos).map((d) => {
  const path = `components/${d[0].split("/").at(2)}`;
  const lazy = async () => {
    const mdxModule: any = await d[1]();
    return {
      Component: mdxModule.default,
      element: mdxModule.element,
      ErrorBoundary: mdxModule.ErrorBoundary,
      errorElement: mdxModule.errorElement,
      loader: mdxModule.loader,
      action: mdxModule.action,
    };
  };

  return { path, lazy };
});

const docs = import.meta.glob("./routes/**/*.mdx");
const docsRoutes: any[] = Object.entries(docs).map((d) => {
  const path = `${d[0].split("/").at(2)?.split(".").at(0)}`;
  const lazy = async () => {
    const mdxModule: any = await d[1]();
    return {
      Component: mdxModule.default,
      element: mdxModule.element,
      ErrorBoundary: mdxModule.ErrorBoundary,
      errorElement: mdxModule.errorElement,
      loader: mdxModule.loader,
      action: mdxModule.action,
    };
  };

  return { path, lazy };
});

const allRoutes = [...docsRoutes, ...demosRoutes];

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
      {
        element: <Layout />,
        loader: layoutLoader,
        children: allRoutes,
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
