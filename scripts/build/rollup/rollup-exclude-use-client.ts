// Files names that should not have use client directive at the top of the output file

// import fg from "fast-glob";

// const pattern = ["packages/core/src/utils/**/*.ts"];
// const a = fg.sync(pattern);
// const b = a.map((d) => d.slice(0, d.lastIndexOf("."))); // remove extname
// const c = b.map((d) => d.split("packages/core/src/")[1]); // remove prefix

// export const ROLLUP_EXCLUDE_USE_CLIENT = ["index", ...c].reduce<string[]>(
//   (acc, name) => {
//     acc.push(`${name}.js`, `${name}.mjs`, `${name}.cjs`);
//     return acc;
//   },
//   []
// );

export const ROLLUP_EXCLUDE_USE_CLIENT = ["index"].reduce<string[]>(
  (acc, name) => {
    acc.push(`${name}.js`, `${name}.mjs`, `${name}.cjs`);
    return acc;
  },
  []
);
