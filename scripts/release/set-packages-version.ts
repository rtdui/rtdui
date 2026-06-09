import path from "node:path";
import fs from "fs-extra";
import { getPath } from "../utils/get-path";

async function writeVersionToPackageJson(filePath: string, version: string) {
  const current = await fs.readJSON(filePath);
  current.version = version;

  if (current.peerDependencies) {
    Object.keys(current.peerDependencies).forEach((packageName) => {
      // 使用bun的`workspace:*`协议无需手动修改工作区中包的版本号, 以下注释的代码不再需要
      // if (packageName.includes("@rtdui/")) {
      //   current.peerDependencies[packageName] = version;
      // }

      // peerDependencies中的react和react-dom最低支持v19
      if (
        packageName === "react" &&
        current.peerDependencies.react !== ">=19.0.0"
      ) {
        current.peerDependencies.react = ">=19.0.0";
      }
      if (
        packageName === "react-dom" &&
        current.peerDependencies["react-dom"] !== ">=19.0.0"
      ) {
        current.peerDependencies["react-dom"] = ">=19.0.0";
      }
    });
  }

  // 使用bun的`workspace:*`协议无需手动修改工作区中包的版本号, 以下注释的代码不再需要

  // if (current.dependencies) {
  //   Object.keys(current.dependencies).forEach((packageName) => {
  //     if (packageName.includes("@rtdui/")) {
  //       current.dependencies[packageName] = version;
  //     }
  //   });
  // }

  // if (current.devDependencies) {
  //   Object.keys(current.devDependencies).forEach((packageName) => {
  //     if (packageName.includes("@rtdui/")) {
  //       current.devDependencies[packageName] = version;
  //     }
  //   });
  // }

  await fs.writeJSON(filePath, current, { spaces: 2 });
}

export async function setPackagesVersion(version: string) {
  const packagesPath = getPath("packages");

  const folders = (await fs.readdir(packagesPath)).filter((folder) =>
    fs.pathExistsSync(path.join(packagesPath, folder, "package.json")),
  );

  await Promise.all(
    folders.map((folder) =>
      writeVersionToPackageJson(
        path.join(packagesPath, folder, "package.json"),
        version,
      ),
    ),
  );

  await writeVersionToPackageJson(getPath("docs-site/package.json"), version);

  await writeVersionToPackageJson(getPath("package.json"), version);
}
