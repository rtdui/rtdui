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
      // peerDependencies中的react和react-dom支持v19
      if(packageName === "react" && current.peerDependencies.react !=="^18.x || ^19.x"){
        current.peerDependencies.react = "^18.x || ^19.x"
      }
      if(packageName === "react-dom" && current.peerDependencies.react !=="^18.x || ^19.x"){
        current.peerDependencies["react-dom"] = "^18.x || ^19.x"
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

  if (current.devDependencies) {
    Object.keys(current.devDependencies).forEach((packageName) => {
      if (packageName.includes("@rtdui/")) {
        current.devDependencies[packageName] = version;
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

  await writeVersionToPackageJson(getPath("docs-site/package.json"), version);

  await writeVersionToPackageJson(getPath("package.json"), version);
}
