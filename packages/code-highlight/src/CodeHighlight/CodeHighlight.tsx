import { forwardRef } from "react";
import clsx from "clsx";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { refractor } from "refractor/lib/all.js";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { IconClipboardCheck, IconCopy } from "@tabler/icons-react";
import { Tooltip, Button, CopyButton } from "@rtdui/core";
import { decorator } from "./decorator";

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
	 * Copied tooltip label
	 * @default 'Copied'
	 */
	copiedLabel?: string;

	/**
	 * 是否启用diff形式
	 */
	diff?: boolean;
	/**
	 * 是否显示行号
	 * @default false
	 */
	showLineNumbers?: boolean;
	/** 字符串范围表示的需要突出显示的行
	 * 如: {1,3-4}
	 */
	highlingtLines?: string;
	/** 坏的范例
	 * @default false
	 */
	bad?: boolean;
}
export const CodeHighlight = forwardRef<HTMLDivElement, CodeHighlightProps>(
	(props, ref) => {
		const {
			code,
			language = "tsx",
			withCopyButton = true,
			copyLabel = "Copy code",
			copiedLabel = "Copied",
			diff = false,
			showLineNumbers = false,
			highlingtLines = "",
			bad = false,
		} = props;

		const ast: any = refractor.highlight(code.trim(), language);
		if (diff || showLineNumbers || highlingtLines) {
			const meta = `${highlingtLines} ${
				showLineNumbers ? "showLineNumbers" : ""
			}`;
			decorator(ast, diff, meta);
		}

		const elements = toJsxRuntime(ast, { Fragment, jsx, jsxs });

		return (
			<div ref={ref}>
				<div className="flex items-start w-full bg-[--prism-color-2]">
					<small className="bg-base-300 uppercase font-bold text-xs rounded-br-md px-2 py-1">
						{language}
					</small>
					<span className="flex-1" />
					{withCopyButton && bad === false && (
						<CopyButton value={code.trim()}>
							{({ copied, copy }) => (
								<Tooltip
									tip={copied ? copiedLabel : copyLabel}
									position="left"
									color={copied ? "success" : "info"}
								>
									<Button size="xs" ghost sharp="square" onClick={copy}>
										{copied ? (
											<IconClipboardCheck
												size={20}
												className="stroke-success"
											/>
										) : (
											<IconCopy size={20} />
										)}
									</Button>
								</Tooltip>
							)}
						</CopyButton>
					)}
				</div>
				<pre
					className={clsx(`language-${language}`, "!mt-0", {
						"!bg-red-100": bad === true,
						"dark:!bg-red-950": bad === true,
					})}
					data-no-lang-indicator={language}
				>
					<code
						className={clsx(`language-${language}`, "code-highlight", {
							"!bg-red-100": bad === true,
							"dark:!bg-red-950": bad === true,
						})}
					>
						{elements}
					</code>
				</pre>
			</div>
		);
	},
);

CodeHighlight.displayName = "@rtdui/CodeHighlight";
