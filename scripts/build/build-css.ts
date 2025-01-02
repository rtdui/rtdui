import path from "node:path";
import fs from "fs-extra";
import postcss from "postcss";
import postcssrc from "postcss-load-config";
import cssnano from "cssnano";
import { createLogger } from "../utils/signale";

const logger = createLogger("build-css");

/** 编译core包中的tailwind, core包含所有包的css */
export async function buildCSS(minify = true, ctx: Record<string, any> = {}) {
	logger.log("Building tailwind css style");

	const packagePath = path.resolve("./packages/core");
	const config = await postcssrc(
		ctx,
		path.join(packagePath, "postcss.config.js"),
	);
	const plugins = minify
		? [...config.plugins, cssnano({ preset: "default" })]
		: config.plugins;
	const options = {
		...config.options,
		from: "tailwind.css",
		to: "index.css",
	};
	const result = await postcss(plugins).process(
		fs.readFileSync(path.join(packagePath, "tailwind.css"), "utf-8") as any,
		options as any,
	);

	// fs.ensureDirSync(path.join(packagePath, "styles"));
	await fs.writeFile(path.join(packagePath, "styles.css"), result.css);
	// 创建layer版本
	await fs.writeFile(
		path.join(packagePath, "styles.layer.css"),
		`@layer rtdui {${result.css}}`,
	);

	logger.success(
		"tailwind css style has been built into packages/core/styles.css",
	);
}
