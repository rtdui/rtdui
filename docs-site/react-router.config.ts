import type { Config } from "@react-router/dev/config";

export default {
  /* 
    prerender 属性指定 Static Pre-rendering, 有三种方式:
      // 1. all static route paths (no dynamic segments like "/post/:slug")
      prerender: true,
      // 2. any url
      prerender: ["/", "/blog", "/blog/popular-post"],
      // 3. async function for dependencies like a CMS
      async prerender({ getStaticPaths }) {
        let posts = await fakeGetPostsFromCMS();
        return ["/", "/blog"].concat(posts.map((post) => post.href));
      }, 
  */
  // prerender: true,
  // serverBuildFile: "assets/server-build.js", // 🚨 使用Hono时启用预渲染别忘了这个
  ssr: false, // 默认为true
  prerender: true,
} satisfies Config;
