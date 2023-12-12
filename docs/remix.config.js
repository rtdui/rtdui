import path from "node:path";
import fg from "fast-glob";

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  server: "./server.ts",
  serverBuildPath: "functions/[[path]].js",
  serverConditions: ["workerd", "worker", "browser"],
  serverDependenciesToBundle: "all",
  serverMainFields: ["browser", "module", "main"],
  serverMinify: true,
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",

  browserNodeBuiltinsPolyfill: { modules: { punycode: true } },

  watchPaths: [
    "../packages/core/src/**/*",
    "../packages/datatable/src/**/*",
    "../packages/dialogs/src/**/*",
    "../packages/editor/src/**/*",
    "../packages/hooks/src/**/*",
    "../packages/notifications/src/**/*",
    "../packages/code-highlight/src/**/*",
    "../packages/qr-code/src/**/*",
    "../packages/tailwind-plugin/src/**/*",
  ],

  // 文档路由
  routes: async (defineRoutes) => {
    // If you need to do async work, do it before calling `defineRoutes`, we use
    // the call stack of `route` inside to set nesting.
    /**
     * @type string[]
     */
    const pages = await fg.async("app/demos/**/*.mdx");
    const routes = pages
      .filter((d) => path.basename(path.dirname(d)) !== "demos")
      .map((d) => ({
        route: path.basename(path.dirname(d)),
        file: d.substring(4),
      }));

    return defineRoutes(async (route) => {
      routes.forEach((d) =>
        route("/components/*", "routes/_layout.tsx", { id: d.route }, () => {
          // - path is relative to parent path
          // - filenames are still relative to the app directory
          route(`${d.route}`, d.file);
        })
      );
    });
  },

  // 编译mdx的配置
  mdx: async (filename) => {
    const [
      remarkToc,
      remarkGfm,
      remarkMath,
      rehypeKatex,
      rehypeSlug,
      // rehypeHighlight,
      rehypePrism,
    ] = await Promise.all([
      import("remark-toc").then((mod) => mod.default), // 为Markdown语法支持目录索引, 它只查找特定的标题文本为其自动生成目录索引, 需要rehype-slug来生成id
      import("remark-gfm").then((mod) => mod.default), // 为Markdown语法扩展GitHub风味支持(支持中划线,表格,任务列表,自动链接,脚注)
      import("remark-math").then((mod) => mod.default), // 为Markdown语法扩展数学公式支持
      import("rehype-katex").then((mod) => mod.default), // 为Markdown生成的HTML Math渲染为Katex, 需要额外引入katex.css, 如:https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css
      import("rehype-slug").then((mod) => mod.default), // 为Markdown生成的HTML的标题生成id, 标题中的空格在id中会被`-`替换
      // import("rehype-highlight").then((mod) => mod.default), // 为Markdown生成的HTML支持代码高亮, 需要额外引入highlight样式
      import("rehype-prism-plus").then((mod) => mod.default), // 为Markdown生成的HTML支持代码高亮, 需要额外引入prism样式
    ]);

    return {
      remarkPlugins: [
        [remarkToc, { heading: "toc|table[ -]of[ -]contents|目录?" }], // 指定特定的标题文本: toc或Table of contents或目录
        remarkGfm,
        remarkMath,
      ],
      rehypePlugins: [
        rehypeSlug,
        // rehypeHighlight,
        rehypePrism,
        rehypeKatex,
      ],
    };
  },
};
