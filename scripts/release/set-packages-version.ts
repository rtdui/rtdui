import path from "node:path";
import fs from "fs-extra";
import { getPath } from "../utils/get-path";

async function writeVersionToPackageJson(filePath: string, version: string) {
  const current = await fs.readJSON(filePath);
  current.version = version;

  if (current.peerDependencies) {
    Object.keys(current.peerDependencies).forEach((packageName) => {
      if (packageName.includes("@rtdui/")) {
        current.peerDependencies[packageName] = version;
      }
    });
  }

  if (current.dependencies) {
    Object.keys(current.dependencies).forEach((packageName) => {
      if (packageName.includes("@rtdui/")) {
        current.dependencies[packageName] = version;
      }
    });
  }

  await fs.writeJSON(filePath, current, { spaces: 2 });
}

export async function setPackagesVersion(version: string) {
  const src = getPath("packages");

  const folders = (await fs.readdir(src)).filter((folder) =>
    fs.pathExistsSync(path.join(src, folder, "package.json"))
  );

  await Promise.all(
    folders.map((folder) =>
      writeVersionToPackageJson(path.join(src, folder, "package.json"), version)
    )
  );

  await writeVersionToPackageJson(getPath("package.json"), version);
}
