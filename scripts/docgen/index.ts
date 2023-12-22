import path from "node:path";
import fs from "fs-extra";
import { generateDeclarations } from "./generate-declarations";

const EXTRA_FILES_PATHS: string[] = [
  // Input
  // "packages/core/src/InlineStyles/InlineStyles.tsx",
];

const PATHS = ["packages/*/src/**/*.tsx", ...EXTRA_FILES_PATHS];

fs.writeJSONSync(
  path.resolve("docs/src/assets/docgen.json"),
  generateDeclarations(PATHS),
  {
    spaces: 2,
  }
);
