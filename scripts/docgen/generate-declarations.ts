import fs from "fs-extra";
import chalk from "chalk";
import fg from "fast-glob";
import { prepareDeclaration } from "./prepare-declaration";
import { docgenParser } from "./docgen-parser";

function replaceName(name: string) {
	if (name === "ScrollAreaAutosize") {
		return "ScrollArea";
	}

	return name;
}

export function generateDeclarations(paths: string[]) {
	const componentsPaths = fg.sync(paths, { absolute: true });

	componentsPaths.forEach((componentPath) => {
		if (!fs.existsSync(componentPath)) {
			process.stdout.write(chalk.red`Path ${componentPath} does not exist \n`);
			process.exit(1);
		}
	});

	return docgenParser
		.parse(componentsPaths)
		.reduce<Record<string, any>>((acc, declaration) => {
			const componentName = replaceName(
				declaration.displayName.replace(/@rtdui\/([^\s]+)\//, ""),
			);
			acc[componentName] = prepareDeclaration(declaration);
			return acc;
		}, {});
}
