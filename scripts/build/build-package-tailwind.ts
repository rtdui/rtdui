import path from "node:path";
import fs from "fs-extra";
import postcss from "postcss";
import postcssrc from "postcss-load-config";
import cssnano from "cssnano";

/** 独立编译各个子包的tailwind, 当前项目并未使用 */
export async function buildPackageTailwind(
  packagePath: string,
  minify = true,
  ctx: Record<string, any> = {}
) {
  if (!packagePath) return;
  const config = await postcssrc(
    ctx,
    path.join(packagePath, "postcss.config.js")
  );
  const plugins = minify
    ? [...config.plugins, cssnano({ preset: "default" })]
    : config.plugins;
  const options = {
    ...config.options,
    from: "tailwind.css",
    to: "index.css",
  };
  const result = await postcss(plugins).process(
    fs.readFileSync(path.join(packagePath, "src/tailwind.css"), "utf-8") as any,
    options as any
  );

  fs.ensureDirSync(path.join(packagePath, "styles"));
  await fs.writeFile(path.join(packagePath, "styles/index.css"), result.css);
  // 创建layer版本
  await fs.writeFile(
    path.join(packagePath, "styles/index.layer.css"),
    `@layer rtdui {${result.css}}`
  );
}
