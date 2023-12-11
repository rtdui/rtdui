/** @type {import('stylelint').Config} */
module.exports = {
  extends: ["stylelint-config-standard", "stylelint-prettier/recommended"],
  rules: {
    "custom-property-pattern": null,
    "selector-class-pattern": null,
    "selector-not-notation": null,
    "selector-pseudo-element-colon-notation": null,
    "declaration-empty-line-before": null,
    "comment-empty-line-before": null,
    "custom-property-empty-line-before": null,
    "declaration-block-no-redundant-longhand-properties": null,
    "alpha-value-notation": null,
    "property-no-vendor-prefix": null,
    "color-function-notation": null,
    "length-zero-no-unit": null,
    "no-descending-specificity": null,
    "hue-degree-notation": null,
    "selector-no-vendor-prefix": null,
    // tailwind
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "apply", "config"], // 支持tailwind
      },
    ],
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: ["theme", "screen"],
      },
    ],
    // postcss-import
    "import-notation": "string",
    // css-modules
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "local"],
      },
    ],
    "selector-type-no-unknown": [
      true,
      {
        ignoreTypes: ["from"],
      },
    ],
    "property-no-unknown": [
      true,
      {
        ignoreProperties: ["composes"],
        ignoreSelectors: [":export", /^:import/],
      },
    ],
  },
};
