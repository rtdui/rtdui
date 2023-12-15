import fs from "fs-extra";
import path from "node:path";
import fg from "fast-glob";

function getDemoSourceCode(filePathOrPaths: string | string[]) {
  const filePaths = Array.isArray(filePathOrPaths)
    ? filePathOrPaths
    : [filePathOrPaths];
  const codes = filePaths.map((filePath) => ({
    name: path.basename(filePath, ".tsx"),
    code: fs.readFileSync(filePath, "utf-8"),
  }));
  fs.writeJsonSync(path.resolve("docs_vite/src/assets/codegen.json"), codes, {
    spaces: 2,
  });
}

const pattern = "docs_vite/src/demos/**/*.tsx";
const demoPaths = fg.sync(pattern, { absolute: true });

getDemoSourceCode(demoPaths);
