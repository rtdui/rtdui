const postcss = require("postcss");
const postcssJs = require("postcss-js");
const fs = require("fs-extra");
const path = require("node:path");
const plugin = require("tailwindcss/plugin");

module.exports = plugin((args) => {
  const { addBase, addComponents, config } = args;

  const themeCSS = fs.readFileSync(
    path.resolve(__dirname, "./theme.css"),
    "utf-8"
  );
  addBase(postcssJs.objectify(postcss.parse(themeCSS)));
  
  // const shikiCSS = fs.readFileSync(
  //   path.resolve(__dirname, "./shiki.css"),
  //   "utf-8"
  // );
  // addBase(postcssJs.objectify(postcss.parse(shikiCSS)));

  const proseMirrorCSS = fs.readFileSync(
    path.resolve(__dirname, "./prose-mirror.css"),
    "utf-8"
  );
  addBase(postcssJs.objectify(postcss.parse(proseMirrorCSS)));

  const dataTableCSS = fs.readFileSync(
    path.resolve(__dirname, "./data-table.css"),
    "utf-8"
  );
  addComponents(postcssJs.objectify(postcss.parse(dataTableCSS)));

  const sliderCSS = fs.readFileSync(
    path.resolve(__dirname, "./slider.css"),
    "utf-8"
  );
  addComponents(postcssJs.objectify(postcss.parse(sliderCSS)));
});
