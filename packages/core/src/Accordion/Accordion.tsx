import React from "react";
import clsx from "clsx";

export interface AccordionProps {
	/**
	 * 项数组
	 */
	items: {
		title: React.ReactNode;
		content: React.ReactNode;
		[key: string]: any;
	}[];
	/** 展开的图标 */
	expandIcon?: "arrow" | "plus";
	/** 初始展开的项索引 */
	initExpandIndex?: number;
	className?: string;
	slots?: {
		itemRoot?: string;
		itemTitle?: string;
		itemContent?: string;
	};
}
export function Accordion(props: AccordionProps) {
	const { items, expandIcon, initExpandIndex = 0, className, slots } = props;

	const name = React.useId();

	const [expandIndex, setExpandIndex] = React.useState(initExpandIndex);

	return (
		<div className={clsx("Accordion", "flex flex-col gap-2", className)}>
			{items.map((d, index) => (
				<div
					key={index}
					className={clsx(
						"collapse",
						"bg-base-200",
						{
							"collapse-arrow": expandIcon === "arrow",
							"collapse-plus": expandIcon === "plus",
						},
						slots?.itemRoot,
					)}
				>
					<input
						type="radio"
						name={name}
						checked={expandIndex === index}
						onChange={(e) => setExpandIndex(index)}
					/>
					<div
						className={clsx(
							"collapse-title text-xl font-medium",
							slots?.itemTitle,
						)}
					>
						{d.title}
					</div>
					<div className={clsx("collapse-content", slots?.itemContent)}>
						{d.content}
					</div>
				</div>
			))}
		</div>
	);
}
