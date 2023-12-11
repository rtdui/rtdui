const postcss = require("postcss");
const postcssJs = require("postcss-js");
const fs = require("fs-extra");
const path = require("node:path");
const plugin = require("tailwindcss/plugin");

module.exports = plugin((args) => {
  const { addBase, addComponents, config } = args;

  const prismCSS = fs.readFileSync(
    path.resolve(__dirname, "./prism.css"),
    "utf-8"
  );
  addBase(postcssJs.objectify(postcss.parse(prismCSS)));

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

  const gridxCSS = fs.readFileSync(
    path.resolve(__dirname, "./grid-x.css"),
    "utf-8"
  );
  addComponents(postcssJs.objectify(postcss.parse(gridxCSS)));

  const sliderCSS = fs.readFileSync(
    path.resolve(__dirname, "./slider.css"),
    "utf-8"
  );
  addComponents(postcssJs.objectify(postcss.parse(sliderCSS)));
});
