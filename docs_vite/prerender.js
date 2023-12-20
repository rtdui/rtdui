// Pre-render the app into static HTML.
// run `yarn generate` and then `dist/static` can be served as a static site.

import fs from "fs-extra";
import fg from "fast-glob";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute("dist/static/index.html"), "utf-8");
const { render } = await import("./dist/server/entry-server.js");

// determine routes to pre-render from ./routes
const routesToPrerender = fg
  .sync("./src/routes/*")
  .filter((d) => {
    const name = d.split("/").at(-1)?.split(".").at(-2).toLowerCase();
    return name !== "root" && name !== "_layout";
  })
  .map((d) => {
    const name = d.split("/").at(-1)?.split(".").at(-2).toLowerCase();
    return name === "_index" ? `/` : `/${name}`;
  });

(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const appHtml = await render(url);

    const html = template.replace(`<!--ssg-html-->`, appHtml);

    const filePath = `dist/static${url === "/" ? "/index" : url}.html`;
    fs.ensureFileSync(toAbsolute(filePath));
    fs.writeFileSync(toAbsolute(filePath), html);
    console.log("pre-rendered:", filePath);
  }
})();

// determine routes to pre-render from src/pages
const demosToPrerender = fg.sync("./src/demos/**/*.mdx").map((d) => {
  const name = d.split("/").at(-2)?.toLowerCase();
  return `/components/${name}`;
});

(async () => {
  // pre-render each route...
  for (const url of demosToPrerender) {
    const appHtml = await render(url);

    const html = template.replace(`<!--ssg-html-->`, appHtml);

    const filePath = `dist/static${url === "/" ? "/index" : url}.html`;
    fs.ensureFileSync(toAbsolute(filePath));
    fs.writeFileSync(toAbsolute(filePath), html);
    console.log("pre-rendered:", filePath);
  }
})();
