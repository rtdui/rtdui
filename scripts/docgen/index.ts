import path from "node:path";
import fs from "fs-extra";
import { generateDeclarations } from "./generate-declarations";

const EXTRA_FILES_PATHS: string[] = [
  // Input
  // "packages/core/src/InlineStyles/InlineStyles.tsx",
];

const PATHS = ["packages/*/src/**/*.tsx", ...EXTRA_FILES_PATHS];

fs.ensureDirSync(path.resolve("docs/app/.docgen"));

fs.writeJSONSync(
  path.resolve("docs/app/.docgen/docgen.json"),
  generateDeclarations(PATHS),
  {
    spaces: 2,
  }
);
