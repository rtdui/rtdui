import { forwardRef, useEffect, useRef, useState } from "react";
import { IconCopy } from "@tabler/icons-react";
import { Tooltip, Button } from "@rtdui/core";
import { codeToHtml } from "shiki";
import {
	transformerNotationDiff,
	transformerNotationErrorLevel,
	transformerNotationFocus,
	transformerNotationHighlight,
	transformerNotationWordHighlight,
	// transformerRemoveLineBreak,
	transformerRemoveNotationEscape,
	transformerMetaHighlight,
	transformerMetaWordHighlight,
	transformerCompactLineOptions,
} from "@shikijs/transformers";
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import { transformerLineNumber } from "./transformers/transformerLineNumber";
import { transformerAddLangDataAttr } from "./transformers/transformerAddLangDataAttr";

const basicShikiTransformers = [
	transformerNotationDiff(),
	transformerNotationErrorLevel(),
	transformerNotationFocus(),
	transformerNotationHighlight(),
	transformerNotationWordHighlight(),
	// transformerRemoveLineBreak(), // 移除换行符会导致mermaid库解析错误
	transformerRemoveNotationEscape(),
	transformerMetaHighlight(),
	transformerMetaWordHighlight(),
	transformerCompactLineOptions(),
	transformerColorizedBrackets(),
	transformerAddLangDataAttr(), // 自定义实现, 为了与复制按钮保持在同一行.
];

export interface CodeHighlightProps {
	/** Code to highlight */
	code: string;
	/**
	 * Code language
	 * @default tsx
	 */
	language?: string;

	/**
	 * Determines whether copy button should be displayed
	 * @default true
	 */
	withCopyButton?: boolean;

	/**
	 * Copy tooltip label
	 * @default 'Copy code'
	 */
	copyLabel?: string;

	/**
	 * 是否显示行号
	 * @default false
	 */
	showLineNumbers?: boolean;
}
export const ShikiHighlight = forwardRef<HTMLDivElement, CodeHighlightProps>(
	(props, ref) => {
		const {
			code,
			language = "tsx",
			withCopyButton = true,
			copyLabel = "Copy code",
			showLineNumbers = false,
		} = props;

		let transformers = basicShikiTransformers;
		if (showLineNumbers) {
			transformers = [...basicShikiTransformers, transformerLineNumber()];
		}

		const [html, setHtml] = useState("");
		useEffect(() => {
			codeToHtml(code, {
				lang: language,
				// themes: {
				// 	light: "one-light",
				// 	dark: "one-dark-pro",
				// },
				theme: "one-dark-pro",
				transformers,
			}).then((html) => {
				setHtml(html);
			});
		}, [code, language, showLineNumbers]);

		const containerRef = useRef<HTMLDivElement>(null!);

		const handleCopyClick = () => {
			const codeElem = containerRef.current.querySelector("code")!;
			const selection = window.getSelection()!;
			// 暂存当前的选择范围
			const old_ranges = [] as Range[];
			if (selection.rangeCount > 0) {
				for (let i = 0; i < selection.rangeCount; i++) {
					old_ranges.push(selection.getRangeAt(i));
				}
			}
			// 清除当前的任何选择
			selection.removeAllRanges();
			// 设置选择
			selection.selectAllChildren(codeElem);
			// 执行复制命令
			// 除copy命令外, 其它命令都不建议使用execCommand方法
			// 使用execCommand("copy")的原因是它会自动处理CSS的user-select: none的情况, 而selection.toString()不会.
			document.execCommand("copy");
			// 恢复选择
			selection.removeAllRanges();
			old_ranges.forEach((d) => {
				selection.addRange(d);
			});
		};

		return (
			<div ref={ref} className="relative">
				{withCopyButton && (
					<div className="absolute top-0 right-1 z-2">
						<Tooltip tip={copyLabel} position="left" color="info">
							<Button size="xs" ghost shape="square" onClick={handleCopyClick}>
								<IconCopy size={20} color="var(--color-gray-400)" />
							</Button>
						</Tooltip>
					</div>
				)}
				<div
					ref={containerRef}
					className="rounded-lg"
					dangerouslySetInnerHTML={{
						__html: html,
					}}
				/>
			</div>
		);
	},
);

ShikiHighlight.displayName = "@rtdui/ShikiHighlight";
