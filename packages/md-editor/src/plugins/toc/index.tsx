import { IconMenuDeep } from "@tabler/icons-react";
import rehypeSlug, { type Options as SlugOptions } from "rehype-slug";
import remarkToc, { type Options as TocOptions } from "remark-toc";
import type { Locale, Plugin } from "../../types";
import { appendBlock, getShortcutWithPrefix } from "../../utils/codemirror";
import en from "../../locales/en.json";

const iconSize = 20;
const iconStroke = 1.5;

export interface Options {
	locale?: Partial<Locale>;
	tocOptions?: TocOptions;
	slugOptions?: SlugOptions;
}
export default function toc(options: Options = {}): Plugin {
	const locale = { ...en, ...(options.locale ?? {}) };
	const {
		tocOptions = {
			heading: `(table[ -]of[ -])?contents?|toc|${locale.toc}`,
			// skip: ".* \\(skip_toc\\)",
		},
		slugOptions = {},
	} = options;
	return {
		remark: (processor) => processor.use<any, any>(remarkToc, tocOptions),
		rehype: (processor) => processor.use<any, any>(rehypeSlug, slugOptions),
		toolbar: [
			{
				type: "single",
				title: locale.toc,
				icon: <IconMenuDeep size={iconSize} stroke={iconStroke} />,
				shortcut: getShortcutWithPrefix("y", true),
				click: (e, { editor }) => {
					appendBlock(editor, `# ${locale.toc}`);
				},
			},
		],
	};
}
