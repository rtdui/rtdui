/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "airbnb", // base,react
    "airbnb-typescript", // typescript
    "airbnb/hooks", // react hooks
    "plugin:prettier/recommended", // 禁用eslint格式化相关的规则, 并且prettier的格式错误作为eslint的错误报告
  ],
  rules: {
    "no-continue": "off", // 循环语句中不可使用continue
    "no-param-reassign": "off", // 函数参数在函数体中不可重新赋值
    "no-unused-vars": "off", // 不能存在未使用的变量 Note: you must disable the base rule as it can report incorrect errors
    "@typescript-eslint/no-unused-vars": "off", // 不能存在未使用的变量
    "react/no-unused-prop-types": "off", // react组件不能有未使用的属性
    "react/display-name": "off", // react组件必须有displayName静态属性
    "@typescript-eslint/no-shadow": "off", // 同一嵌套层级中不能有同名的变量, 也就是不能有外部变量被隐藏的情况
    // "prefer-destructuring": "off", // 要求使用解构赋值, 不允许类似这种情况: const b = a.b; 应改为: const {b} = a;
    "react/react-in-jsx-scope": "off",

    // 外部
    "react/jsx-pascal-case": "off",
    "newline-per-chained-call": "off", // 链式调用后都需要换行符
    "import/extensions": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/no-noninteractive-tabindex": "off",
    "react/self-closing-comp": "off", // 空内容的元素应该使用自闭合语法
    "react/jsx-closing-bracket-location": "off",
    "@typescript-eslint/method-signature-style": ["error", "property"],
    "@typescript-eslint/no-loop-func": "off",
    "no-restricted-syntax": "off",

    // React项目的通用规则, 可分离到独立的扩展中
    "max-len": [
      "error",
      80,
      {
        ignoreTrailingComments: true,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
      },
    ],
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/no-redeclare": "off",
    "no-nested-ternary": "off",
    "no-confusing-arrow": "off",
    "no-underscore-dangle": "off",
    "no-unused-expressions": "off",
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }], // 不允许使用++或--, 应改为: a += 1; 但允许在循环条件的末尾使用.
    "default-case": "off",
    "arrow-parens": "off",
    "function-paren-newline": "off",
    camelcase: "off",
    "operator-linebreak": "off",
    "object-curly-newline": "off",
    "implicit-arrow-linebreak": "off",
    "spaced-comment": "off",
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "ignore",
      },
    ],

    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "class-methods-use-this": "off",
    "react/state-in-constructor": "off",
    "react/jsx-curly-newline": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-indent": "off",
    "react/jsx-wrap-multilines": "off",
    "react/static-property-placement": "off",
    "react/require-default-props": "off",
    "react/destructuring-assignment": "off",
    "react/sort-comp": "off",
    "react/no-danger": "off",
    "react/no-array-index-key": "off",
    "react/prop-types": "off",
    "react/jsx-no-bind": "off",
    "react/function-component-definition": "off",
    "react/jsx-no-constructed-context-values": "off",
    "react/no-unstable-nested-components": "off",
    "react/jsx-no-useless-fragment": "off",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "jsx-a11y/mouse-events-have-key-events": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/label-has-for": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
  },
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
};
