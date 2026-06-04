import { parse } from "postcss";
import postcssJs from "postcss-js";
import fs from "fs-extra";
import path from "node:path";
import createPlugin, { type PluginAPI } from "tailwindcss/plugin";

module.exports = createPlugin((args: PluginAPI) => {
  const { addBase, addComponents } = args;

  const themeCSS = fs.readFileSync(
    path.resolve(__dirname, "../css/theme.css"),
    "utf-8",
  );
  addBase(postcssJs.objectify(parse(themeCSS) as any));

  const shikiCSS = fs.readFileSync(
    path.resolve(__dirname, "../css/shiki.css"),
    "utf-8",
  );
  addBase(postcssJs.objectify(parse(shikiCSS) as any));

  const proseMirrorCSS = fs.readFileSync(
    path.resolve(__dirname, "../css/prose-mirror.css"),
    "utf-8",
  );
  addBase(postcssJs.objectify(parse(proseMirrorCSS) as any));

  // const dataTableCSS = fs.readFileSync(
  //   path.resolve(__dirname, "./data-table.css"),
  //   "utf-8"
  // );
  // addComponents(postcssJs.objectify(postcss.parse(dataTableCSS)));

  const sliderCSS = fs.readFileSync(
    path.resolve(__dirname, "../css/slider.css"),
    "utf-8",
  );
  addComponents(postcssJs.objectify(parse(sliderCSS) as any));
});
