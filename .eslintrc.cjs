/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended", // prettier的格式错误作为eslint的错误报告
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  settings: {
    react: {
      version: "999.999.999", // 消除eslint未指定react版本的警告
    },
  },
  rules: {
    "no-unused-vars": "off", // 不能存在未使用的变量
    "@typescript-eslint/no-unused-vars": "off", // 不能存在未使用的变量, 注意: 要想生效必须也禁用"no-unused-vars"基本规则因为它也会报告错误
    "@typescript-eslint/ban-ts-comment": "off", // 需要使用 "@ts-expect-error" 替代 "@ts-ignore"
    "@typescript-eslint/no-explicit-any": "off", // 不允许使用any类型
    "react/display-name": "off", // react组件必须有displayName静态属性
    "react/react-in-jsx-scope": "off", // 模块中使用jsx则必须导入react
  },
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
};
