import { getPackagesList, type Package } from "../packages/get-packages-list";

/**
 * 根据依赖关系获取工作区中包的构建顺序
 * @param packages 工作区中的包列表
 * @param pkg 需要设置的包
 * @param order 记录各包的顺序的对象, -1 最优先(私有包), 0 不依赖工作区中其它的包, 每依赖工作区中其它包加1
 */
export async function getPackageBuildOrder(
  packages: Package[],
  pkg: Package,
  order: Record<string, number> = {},
) {
  const name = pkg.packageJson.name!;

  if (name in order) return;
  if (pkg.packageJson.private) {
    order[name] = -1;
    return;
  }

  packages = packages || [];

  const dependencies = Object.keys({
    ...pkg.packageJson.peerDependencies,
    ...pkg.packageJson.dependencies,
    ...pkg.packageJson.devDependencies,
  })
    .filter((dependency) => dependency.includes("@rtdui/"))
    .map((dependency) =>
      packages.find((pkgItem) => pkgItem.packageJson.name === dependency),
    );

  if (dependencies.length === 0) {
    order[name] = 0;
    return;
  }

  await Promise.all(
    dependencies.map((dependency) =>
      getPackageBuildOrder(packages, dependency!, order),
    ),
  );

  order[name] =
    1 +
    Math.max(
      ...dependencies.map((dependency) => order[dependency!.packageJson.name!]),
    );
}

/**
 * 根据依赖关系获取工作区中所有包的构建顺序
 * @param packages 工作区中的包列表
 * @param order 记录各包的顺序的对象, 可以传参手动设置某些包的顺序. -1 最优先(私有包), 0 不依赖工作区中的包, 每依赖工作区中其它包加1
 */
export async function getPackagesBuildOrder(
  packages?: Package[],
  order: Record<string, number> = {},
): Promise<Package[]> {
  const _packages = packages || getPackagesList();

  for (const pkg of _packages) {
    await getPackageBuildOrder(_packages, pkg, order);
  }

  return Object.keys(order)
    .filter((p) => order[p] !== -1)
    .sort((a, b) => order[a] - order[b])
    .map((p) => _packages.find((d) => d.packageJson.name === p)!);
}
