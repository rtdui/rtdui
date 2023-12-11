import path from "node:path";
import fs from "fs-extra";
import type { PackageJson } from "type-fest";

export interface Package {
  path: string;
  packageJsonPath: string;
  packageJson: PackageJson;
}

export function getPackagesList() {
  const basePath = path.resolve("./packages");
  const srcPaths = fs.readdirSync(basePath);
  const packages: Package[] = [];
  const exclude: string[] = [
    path.join(basePath, "tailwind-plugin", "package.json"),
  ];

  for (const srcPath of srcPaths) {
    const packageJsonPath = path.join(basePath, srcPath, "package.json");
    if (
      fs.pathExistsSync(packageJsonPath) &&
      !exclude.includes(packageJsonPath)
    ) {
      packages.push({
        path: path.join(basePath, srcPath),
        packageJsonPath,
        packageJson: fs.readJSONSync(packageJsonPath),
      });
    }
  }

  return packages;
}
