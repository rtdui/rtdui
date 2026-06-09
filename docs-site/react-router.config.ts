import type { Config } from "@react-router/dev/config";

export default {
  /* 
    prerender 属性指定 Static Pre-rendering, 有三种方式:
      // 1. all static route paths (no dynamic segments like "/post/:slug")
      prerender: true,
      // 2. some url
      prerender: ["/", "/blog", "/blog/popular-post"],
      // 3. async function for dependencies like a CMS
      async prerender({ getStaticPaths }) {
        let posts = await fakeGetPostsFromCMS();
        return ["/", "/blog"].concat(posts.map((post) => post.href));
      }, 
  */
  ssr: false, // 默认为true
  prerender: true,
  future: {
    v8_middleware: true,
    v8_passThroughRequests: true,
    v8_splitRouteModules: true,
    v8_trailingSlashAwareDataRequests: true,
    v8_viteEnvironmentApi: true,
  },
} satisfies Config;
