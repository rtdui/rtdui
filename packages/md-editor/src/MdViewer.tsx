import { useMergedRef } from "@rtdui/hooks";
import clsx from "clsx";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type { Locale, ProcessorOptions, VFile } from "./types";
import { getProcessor } from "./utils/get-processor";
import enLocale from "./locales/en.json";
import breaks from "./plugins/breaks";
import gfm from "./plugins/gfm";
import math from "./plugins/math";
import highlight from "./plugins/highlight";
import mermaid from "./plugins/mermaid";
import toc from "./plugins/toc";
import gemoji from "./plugins/gemoji";

export interface MdViewerOwnProps extends ProcessorOptions {
	value?: string;
	locale?: Locale;
}
export type MdViewerProps = MdViewerOwnProps &
	Omit<React.ComponentPropsWithoutRef<"div">, keyof MdViewerOwnProps>;

export const MdViewer = forwardRef<HTMLDivElement, MdViewerProps>(
	(props, ref) => {
		const {
			value,
			plugins: pluginsProp = [],
			locale: localeProp,
			sanitize,
			remarkRehypeOptions,
			className,
			...other
		} = props;

		const locale = useMemo(
			() => ({ ...enLocale, ...localeProp }),
			[localeProp],
		);

		const _plugins = useMemo(
			() => [
				breaks(),
				gfm({ locale }),
				math({ locale }),
				mermaid({ locale }),
				highlight(),
				toc({ locale }),
				gemoji(),
			],
			[locale],
		);

		const plugins = useMemo(
			() => [..._plugins, ...pluginsProp],
			[_plugins, pluginsProp],
		);

		const rootRef = useRef<HTMLDivElement>();
		const mergedRef = useMergedRef(ref, rootRef);

		const processor = useMemo(
			() =>
				getProcessor({
					plugins,
					sanitize,
					remarkRehypeOptions,
				}),
			[plugins, sanitize, remarkRehypeOptions],
		);

		const [file, setFile] = useState<VFile>(null!);

		useEffect(() => {
			processor.process(value).then((vfile) => {
				setFile(vfile);
			});
			// setFile(processor.processSync(value));
		}, [value]);

		useEffect(() => {
			if (!file) return;
			const cbs = plugins?.map(({ viewerEffect }) =>
				viewerEffect?.({
					markdownBody: rootRef.current!,
					file,
				}),
			);

			return () => {
				cbs?.forEach((cb) => cb?.());
			};
		}, [file]);

		return (
			<div
				ref={mergedRef}
				{...other}
				className={clsx(
					"md-viewer",
					"[&_.hljs]:p-0 [&_.hljs]:bg-transparent",
					"[&_pre:not(:has(code))]:bg-transparent",
					"prose",
					"prose-h1:my-4 prose-h2:my-4 prose-h3:my-4 prose-h4:my-4",
					"prose-p:my-2",
					"prose-ul:pl-4 prose-ol:pl-4",
					"prose-a:text-blue-500",
					"prose-table:table prose-table:table-xs prose-td:border prose-td:border-base-300 prose-th:border prose-th:border-base-300 prose-thead:bg-base-200",
					className,
				)}
			>
				<div
					dangerouslySetInnerHTML={{
						__html: file?.toString() ?? "",
					}}
				/>
			</div>
		);
	},
);

MdViewer.displayName = "@rtdui/md-editor/MdViewer";
