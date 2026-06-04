import path from "node:path";
import { createLogger } from "../utils/signale";

const logger = createLogger("build-css");

/** 编译core包中的tailwind, core包含所有包的css */
export async function buildTailwindCSS() {
  logger.log("Building tailwind css style");

  // 只需编译core包, 它已经包含了所有包的css
  const packagePath = path.resolve("./packages/core");

  const inputPath = path.join(packagePath, "tailwind.css");
  const outPath = path.join(packagePath, "styles.css");

  const proc = Bun.spawn([
    "bunx",
    "@tailwindcss/cli",
    "-i",
    inputPath,
    "-o",
    outPath,
  ]);

  const exited = await proc.exited;

  if (exited !== 0) {
    throw new Error("tailwindcss build failure");
  }

  const outFile = Bun.file(outPath);
  const cssContent = await outFile.text();

  // 创建layer版本
  await Bun.write(
    path.join(packagePath, "styles.layer.css"),
    `@layer rtdui {
  ${cssContent}
}`,
  );

  logger.success(
    "tailwindcss style has been built into packages/core/styles.css",
  );
}
