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
// import { openGithubRelease } from "./open-github-release";
import packageJson from "../../package.json";

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
 *  1. build all packages
 *  2. 更新版本号
 *  3. 执行 `bun i` 安装依赖, 这会更新bun.lock中的工作区的版本号, bun 发布时使用bun.lock中工作区的版本号替代`workspace:*`的版本.
 *  4. 每个包独立发布到NPM
 *  5. Git提交并推送到远程
 */
async function release() {
  const status = await git.status();

  if (status.files.length !== 0) {
    logger.error("Working tree is not clean");
    process.exit(1);
  }

  logger.log("Releasing all packages");

  // 1.
  await buildAllPackages();
  logger.success("All packages have been built successfully");
  // 2.
  const newVersion = getNextVersion(packageJson.version, {
    type: argv._[0],
    stage: argv.stage,
  });
  logger.log(`New version: ${chalk.cyan(newVersion)}`);
  await setPackagesVersion(newVersion);
  // 3.
  await execa("bun", ["i"]);
  // 4.
  logger.log("Publishing packages to npm");
  if (argv.stage && argv.tag === "latest") {
    argv.tag = "next";
  }
  const packages = getPackagesList();
  await Promise.all(
    packages.map((p) =>
      publishPackage({
        packagePath: p.path,
        name: p.packageJson.name!,
        tag: argv.tag,
      }),
    ),
  );
  logger.success("All packages have been published successfully");
  // 5.
  await git.add([
    getPath("packages"),
    getPath("package.json"),
    getPath("bun.lock"),
    getPath("docs-site/package.json"),
  ]);
  await git.commit(`[release] Version: ${newVersion}`);
  await git.push();

  // openGithubRelease(incrementedVersion);
}

release();
