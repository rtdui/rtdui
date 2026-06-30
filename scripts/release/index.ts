import path from "node:path";
import fs from "fs-extra";
import chalk from "chalk";
import simpleGit from "simple-git";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { getNextVersion } from "version-next";
import { execa } from "execa";
import { createLogger } from "../utils/signale";
import { buildAllPackages } from "../build/build-all-packages";
import { getPackagesList } from "../packages/get-packages-list";
import { getPath } from "../utils/get-path";
import { publishPackage } from "../publish/publish-package";
import { setPackagesVersion } from "./set-packages-version";
import packageJson from "../../package.json";
import bunLock from "../../bun.lock";

const logger = createLogger("release");
const git = simpleGit();

const { argv }: { argv: any } = yargs(hideBin(process.argv))
  .option("stage", {
    type: "string",
    choices: ["alpha", "beta"],
    description: "Prerelease stage: 'alpha', 'beta'",
  })
  .option("tag", {
    type: "string",
    default: "latest",
    description: "Tag",
  });

/**
 * 步骤：
 *  1. 更新版本号, 先更新版本号是为了当执行`bun update`时能更新了bun.lock中的版本
 *  2. 执行 `bun i` 安装依赖, 注意: 这不一定为会更新bun.lock中的工作区的版本号(这是个bug), bun 发布时使用bun.lock中工作区的版本号来替换`workspace:*`的版本.
 *  3. build all packages
 *  4. 每个包独立发布到NPM
 *  5. Git提交并推送到远程
 */
async function release() {
  // const status = await git.status();

  // if (status.files.length !== 0) {
  //   logger.error("Working tree is not clean");
  //   process.exit(1);
  // }

  // 1.
  logger.log("Setup new version");
  const newVersion = getNextVersion(packageJson.version, {
    type: argv._[0],
    stage: argv.stage,
  });
  logger.log(`New version: ${chalk.cyan(newVersion)}`);
  await setPackagesVersion(newVersion);

  // 2.
  logger.log("Install all dependencies");
  await execa`bun i`;

  const packages = getPackagesList();
  //#region 手动更新bun.lock中的工作区包的版本号(暂时解决`bun i`不更新bun.lock中工作区包的版本号的bug), bun 发布时使用bun.lock中工作区的版本号来替换`workspace:*`的版本.
  packages
    .map((d) => `packages/${path.basename(d.path)}`)
    .forEach((d) => (bunLock.workspaces[d].version = newVersion));
  await fs.writeJSON("bun.lock", bunLock, { spaces: 2 });
  //#endregion

  // // 4.
  // logger.log("Building all packages");
  // await buildAllPackages();
  // logger.success("All packages have been built successfully");

  // // 5.
  // logger.log("Publishing packages to npm");
  // if (argv.stage && argv.tag === "latest") {
  //   argv.tag = "next";
  // }
  // // const packages = getPackagesList();
  // await Promise.all(
  //   packages.map((p) =>
  //     publishPackage({
  //       packagePath: p.path,
  //       name: p.packageJson.name!,
  //       tag: argv.tag,
  //     }),
  //   ),
  // );
  // logger.success("All packages have been published successfully");
  // // 6.
  // logger.log("Git commit and push");
  // await git.add([
  //   getPath("packages"),
  //   getPath("package.json"),
  //   getPath("bun.lock"),
  //   getPath("docs-site/package.json"),
  // ]);
  // await git.commit(`[release] Version: ${newVersion}`);
  // await git.push();
}

release();
