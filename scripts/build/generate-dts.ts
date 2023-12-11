import path from "node:path";
import execa from "execa";

export async function generateDts(packagePath: string) {
  await execa("tsc", [
    "--project",
    path.join(packagePath, "tsconfig.build.json"),
  ]);
}
