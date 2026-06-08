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
 *  1. 执行 `npm i` 安装依赖
 *  2. build all packages
 *  3. 更新版本号
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
  await execa("npm", ["i"]);
  // 2.
  await buildAllPackages();
  logger.success("All packages have been built successfully");
  // 3.
  const incrementedVersion = getNextVersion(packageJson.version, {
    type: argv._[0],
    stage: argv.stage,
  });
  logger.log(`New version: ${chalk.cyan(incrementedVersion)}`);
  await setPackagesVersion(incrementedVersion);
  // 4.
  logger.log("Publishing packages to npm");
  if (argv.stage && argv.tag === "latest") {
    argv.tag = "next";
  }
  const packages = getPackagesList();
  await Promise.all(
    packages.map((p) =>
      publishPackage({
        packagePath: p!.path,
        name: p!.packageJson.name!,
        tag: argv.tag,
      }),
    ),
  );
  logger.success("All packages have been published successfully");
  // 5.
  await git.add([
    getPath("packages"),
    getPath("package.json"),
    getPath("docs-site/package.json"),
  ]);
  await git.commit(`[release] Version: ${incrementedVersion}`);
  await git.push();

  // openGithubRelease(incrementedVersion);
}

release();
