import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { visit } from "unist-util-visit";
import { getProcessor } from "./utils/get-processor";
import { useMdEditorContext } from "./context";
import type { Plugin, Root, Element, Toc, VFile } from "./types";
import { useMergedRef } from "@rtdui/hooks";
import clsx from "clsx";

function stringifyHeading(e: Element) {
	let result = "";
	visit(e, (node) => {
		if (node.type === "text") {
			result += node.value;
		}
	});
	return result;
}

export type PreviewOwnProps = {};
export type PreviewProps = PreviewOwnProps &
	Omit<React.ComponentPropsWithoutRef<"div">, keyof PreviewOwnProps>;

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(
	(props, ref) => {
		const { className, ...other } = props;

		const {
			value,
			plugins = [],
			sanitize,
			remarkRehypeOptions,
			onMetaChange,
		} = useMdEditorContext();

		const rootRef = useRef<HTMLDivElement>();
		const mergedRef = useMergedRef(ref, rootRef);

		const tocPlugin: Plugin = useMemo(
			() => ({
				rehype: (processor) =>
					processor.use(() => (hast: Root, file) => {
						// console.log(hast, file);
						const toc = [] as Toc;
						hast.children
							.filter((v) => v.type === "element")
							.forEach((node) => {
								const element = node as Element;
								if (element.tagName[0] === "h" && !!element.children.length) {
									const i = Number(element.tagName[1]);
									toc.push({
										level: i,
										text: stringifyHeading(element),
										slug: element.properties.id as string,
									});
								}
							});
						onMetaChange?.({ hast, file, toc });
					}),
			}),
			[onMetaChange],
		);

		const processor = useMemo(
			() =>
				getProcessor({
					plugins: [...plugins, tocPlugin],
					sanitize,
					remarkRehypeOptions,
				}),
			[plugins, tocPlugin, sanitize, remarkRehypeOptions],
		);

		const [file, setFile] = useState<VFile>(null!);

		useEffect(() => {
			setFile(processor.processSync(value));
		}, [value]);

		useEffect(() => {
			const cbs = plugins?.map(({ viewerEffect }) =>
				viewerEffect?.({
					markdownBody: rootRef.current!,
					file,
				}),
			);

			return () => {
				cbs?.forEach((cb) => cb?.());
			};
		}, [value]);

		// 滚动元素和生成html元素不可为同一元素, 否则会出现滚动问题. 因此每次生成html时会导致滚动事件触发.
		return (
			<div
				ref={mergedRef}
				{...other}
				className={clsx(
					"md-preview",
					"[&_.hljs]:p-0 [&_.hljs]:bg-transparent",
					"[&_pre:not(:has(code))]:bg-transparent",
					"prose max-w-none",
					"prose-h1:my-4 prose-h2:my-4 prose-h3:my-4 prose-h4:my-4",
					"prose-p:my-2",
					"prose-blockquote:bg-base-200",
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

Preview.displayName = "@rtdui/md-editor/Preview";
