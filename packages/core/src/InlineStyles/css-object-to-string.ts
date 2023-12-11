import { camelToKebabCase } from "../utils";

export function cssObjectToString(css: React.CSSProperties) {
  const csss = css as any;
  return Object.keys(css)
    .reduce(
      (acc, rule) =>
        csss[rule] !== undefined
          ? `${acc}${camelToKebabCase(rule)}:${csss[rule]};`
          : acc,
      ""
    )
    .trim();
}
