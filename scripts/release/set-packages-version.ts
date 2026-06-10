import path from "node:path";
import fs from "fs-extra";
import { getPath } from "../utils/get-path";

async function writeVersionToPackageJson(
  packageJsonPath: string,
  version: string,
) {
  const packageJson = await fs.readJSON(packageJsonPath);
  packageJson.version = version;

  //#region 使用bun的`workspace:*`和`catalog:`协议无需手动设置版本号, 此区域的代码不再需要
  // if (current.peerDependencies) {
  //   Object.keys(current.peerDependencies).forEach((packageName) => {
  //     if (packageName.includes("@rtdui/")) {
  //       current.peerDependencies[packageName] = version;
  //     }
  //     // peerDependencies中的react和react-dom最低支持v19.2
  //     if (
  //       packageName === "react" &&
  //       current.peerDependencies.react !== "^19.2.0"
  //     ) {
  //       current.peerDependencies.react = "^19.2.0";
  //     }
  //     if (
  //       packageName === "react-dom" &&
  //       current.peerDependencies["react-dom"] !== "^19.2.0"
  //     ) {
  //       current.peerDependencies["react-dom"] = "^19.2.0";
  //     }
  //   });
  // }

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
  //#endregion

  await fs.writeJSON(packageJsonPath, packageJson, { spaces: 2 });
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
