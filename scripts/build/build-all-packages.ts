import chalk from "chalk";
import { buildPackage } from "./build-package";
import { getPackagesBuildOrder } from "./get-packages-build-order";
import { createLogger } from "../utils/signale";
import { getBuildTime } from "./get-build-time";
import { buildCSS } from "./build-css";

const logger = createLogger("build-all-packages");

export async function buildAllPackages() {
  const packages = await getPackagesBuildOrder();
  const excludes = ["@rtdui/tailwind-plugin"];

  const startTime = Date.now();
  logger.log("Building all packages...");

  for (const item of packages) {
    if (!item!.packageJson.name) {
      process.stdout.write(`Skipping ${item!.path} because it has no name\n`);
    } else if (excludes.includes(item.packageJson.name)) {
      process.stdout.write(`Skipping ${item!.path} because it is excluded\n`);
    } else {
      // eslint-disable-next-line no-await-in-loop
      await buildPackage(item!.packageJson.name);
    }
  }

  await buildCSS();

  logger.success(
    `All packages have been built in ${chalk.green(getBuildTime(startTime))}`
  );

  return packages;
}
