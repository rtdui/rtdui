import path from "node:path";
import { withCustomConfig, PropItem } from "react-docgen-typescript";

const EXCLUDE_PROPS = ["key", "ref", "style", "className"];

export const docgenParser = withCustomConfig(path.resolve("tsconfig.json"), {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  propFilter: (prop: PropItem) => {
    if (
      EXCLUDE_PROPS.includes(prop.name) ||
      prop.name.startsWith("__") ||
      prop.name.startsWith("data-")
    ) {
      return false;
    }

    // if (prop.name === "variant" && prop.type.name === "string") {
    //   return false;
    // }

    if (prop.declarations !== undefined && prop.declarations.length > 0) {
      return Boolean(
        prop.declarations.find(
          (declaration) => !declaration.fileName.includes("node_modules")
        )
      );
    }

    return true;
  },
});
