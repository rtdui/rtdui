/**
 * 新建工作区包目录模板的脚本
 */

import fs from "fs-extra";
import path from "node:path";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";
import { execa } from "execa";
import { createLogger } from "../utils/signale";
import { getPath } from "../utils/get-path";
import rootPackageJson from "../../package.json";
import { getPackageDir } from "../packages/get-package-dir";

const logger = createLogger("plop");

const { argv } = yargs(hideBin(process.argv)) as any;
// 命令行参数中包名可以带`@rdtui/`前置也可以不带.
const packageName = argv._[0];
const description = argv._[1];

if (!packageName) {
  logger.error("Package name is missing");
  process.exit(1);
}
const packageDir = getPackageDir(packageName);

if (!description) {
  logger.error("Package description is missing");
  process.exit(1);
}

const packagePath = path.join(getPath("packages"), packageDir);

if (fs.existsSync(packagePath)) {
  logger.error(`Package dir ${chalk.cyan(packageDir)} already exists`);
  process.exit(1);
}

const index = fs.readFileSync(
  getPath("scripts/plop/templates/src/index.ts"),
  "utf-8",
);
const npmignore = fs.readFileSync(
  getPath("scripts/plop/templates/.npmignore"),
  "utf-8",
);
const packageJson = fs.readFileSync(
  getPath("scripts/plop/templates/package.json"),
  "utf-8",
);
const readme = fs.readFileSync(
  getPath("scripts/plop/templates/README.md"),
  "utf-8",
);
const tsconfig = fs.readFileSync(
  getPath("scripts/plop/templates/tsconfig.json"),
  "utf-8",
);
const tsconfigBuild = fs.readFileSync(
  getPath("scripts/plop/templates/tsconfig.build.json"),
  "utf-8",
);

function replacePlaceholders(content: string) {
  return (
    content
      .replaceAll("{{package}}", packageDir)
      .replaceAll("{{description}}", description)
      // 使用根目录下package.json中版本号作为模板中的版本好
      .replaceAll("{{version}}", rootPackageJson.version)
  );
}

fs.ensureDirSync(packagePath);
fs.mkdirSync(path.join(packagePath, "src"));
fs.writeFileSync(
  path.join(packagePath, "src/index.ts"),
  replacePlaceholders(index),
);
fs.writeFileSync(
  path.join(packagePath, ".npmignore"),
  replacePlaceholders(npmignore),
);
fs.writeFileSync(
  path.join(packagePath, "package.json"),
  replacePlaceholders(packageJson),
);
fs.writeFileSync(
  path.join(packagePath, "README.md"),
  replacePlaceholders(readme),
);
fs.writeFileSync(
  path.join(packagePath, "tsconfig.json"),
  replacePlaceholders(tsconfig),
);
fs.writeFileSync(
  path.join(packagePath, "tsconfig.build.json"),
  replacePlaceholders(tsconfigBuild),
);

logger.success(`Package dir ${chalk.cyan(packageDir)} has been created`);

execa("bun", ["i"]);
