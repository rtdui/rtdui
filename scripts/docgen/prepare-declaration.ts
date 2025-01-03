import type { ComponentDoc } from "react-docgen-typescript";

function replaceBackticks(str: string): string {
	return str.replace(/`([^`]+)`/g, "<code>$1</code>");
}

const replace = {
	ReactNode: "React.ReactNode",
	ElementType: "React.ElementType",
};

export function prepareDeclaration(declaration: ComponentDoc) {
	const data: any = { ...declaration };
	delete data.tags;
	delete data.methods;

	Object.keys(data.props).forEach((prop) => {
		delete data.props[prop].parent;
		delete data.props[prop].declarations;
		// delete data.description;

		if (data.props[prop].type.name === "enum") {
			data.props[prop].type.name = data.props[prop].type.raw;
		}

		if (data.props[prop].type.name in replace) {
			data.props[prop].type.name = (replace as any)[data.props[prop].type.name];
		}
	});

	// This sorts the props object in ascending order
	const ordered = Object.keys(data.props)
		.sort()
		.reduce<Record<string, any>>((obj, key) => {
			obj[key] = data.props[key];
			data.props[key].description = replaceBackticks(
				data.props[key].description,
			);
			return obj;
		}, {});

	data.props = ordered;

	return data;
}
