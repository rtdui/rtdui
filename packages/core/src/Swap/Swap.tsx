import { forwardRef, useRef, useEffect, Children } from "react"; // forwardRef的组件必须是这种形式, 否则gendoc生成会忽略该组件.
import clsx from "clsx";
import { useMergedRef } from "@rtdui/hooks";

export interface SwapProps extends React.ComponentPropsWithoutRef<"input"> {
	/**
	 * 是否启用中间态
	 * @default false
	 */
	indeterminate?: boolean;
	/**
	 * clasName应用于内部的label元素.
	 * 内部使用了<label>元素模拟checkbox的点击
	 */
	className?: string;
	/**
	 * 过渡效果
	 * @default fade
	 */
	transitionEffect?: "fade" | "rotate" | "flip";
	/**
	 * 如果indeterminate未启用时, 应提供并列的两个孩子作为切换元素, 其中第一个为on时的显示元素, 第二个为off时的显示元素;
	 * 否则应提供并列的三个孩子, 其中前两个作为切换元素, 最后一个作为中间态时的显示元素.
	 * 元素可以是任意有效的React元素.
	 */
	children: React.ReactNode;
}

export const Swap = forwardRef<HTMLInputElement, SwapProps>(
	(props, forwardRef) => {
		const {
			indeterminate = false,
			transitionEffect = "fade",
			className,
			children,
			...other
		} = props;

		const inputRef = useRef<HTMLInputElement>(null!);
		const mergedRef = useMergedRef<HTMLInputElement>(inputRef, forwardRef);

		useEffect(() => {
			// 初始时设置中间态
			inputRef.current.indeterminate = indeterminate;
		}, [indeterminate]);
		return (
			<label
				className={clsx(
					"swap",
					{
						"swap-rotate": transitionEffect === "rotate",
						"swap-flip": transitionEffect === "flip",
					},
					className,
				)}
			>
				<input {...other} ref={mergedRef} type="checkbox" className="hidden" />
				{Children.toArray(children)
					.slice(0, indeterminate ? 3 : 2)
					.map((d, index) => (
						<div
							key={index}
							className={clsx({
								"swap-on": index === 0,
								"swap-off": index === 1,
								"swap-indeterminate": index === 2,
							})}
						>
							{d}
						</div>
					))}
			</label>
		);
	},
);

Swap.displayName = "@rtdui/Swap";
