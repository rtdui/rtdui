/** @type {import("prettier").Config} */
// VSCode Prettier扩展的默认配置
const config = {
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "lf",
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  singleAttributePerLine: false,
  bracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 80,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  requirePragma: false,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: false,
  embeddedLanguageFormatting: "auto",
  vueIndentScriptAndStyle: false,
};

// prettier.config.mjs, or .prettierrc.mjs
export default config;

// prettier.config.cjs, or .prettierrc.cjs
// module.exports = config;
