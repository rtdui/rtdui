/** 通过包名得到目录名, 包名中带有scope则移除它. */
export function getPackageDir(packageName: string) {
  return packageName.replace("@rtdui/", "");
}
