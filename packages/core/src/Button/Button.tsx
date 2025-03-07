import { forwardRef } from "react";
import clsx from "clsx";
import type { ThemeBaseSize } from "../theme.types";

export interface ButtonProps
	extends Omit<React.ComponentPropsWithoutRef<"button">, "size"> {
	color?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error"
		| "neutral";
	/** 尺寸大小 */
	size?: ThemeBaseSize;
	/**
	 * 矩形或圆形, 用于单字符或图标
	 * @deprecated 使用shape替代
	 */
	sharp?: "square" | "circle";
	/** 矩形或圆形, 用于单字符或图标 */
	shape?: "square" | "circle";
	/** 加宽 */
	wide?: boolean;
	/** full width, 优先级高于wide */
	fullWidth?: boolean;
	/** 左侧图标元素 */
	startIcon?: React.ReactNode;
	/** 右侧图标元素 */
	endIcon?: React.ReactNode;
	/** 是否在左侧显示加载动画图标 */
	loading?: boolean;
	/** 加载动画图标的显示位置
	 * @default "left"
	 */
	loadingPosition?: "left" | "right";
	/** 无点击动画, v5不再有效果
	 * @deprecated
	 */
	noAnimation?: boolean;
	/** link样式, 优先级高于 glass, ghost, outline, dash, soft */
	link?: boolean;
	/** 无边框和背景的样式 */
	ghost?: boolean;
	/** 毛玻璃效果的样式,需要有背景才有效果, 优先级高于 outline, dash, soft */
	glass?: boolean;
	/** 边框样式 */
	outline?: boolean;
	/** 虚框样式 */
	dash?: boolean;
	/** soft样式 */
	soft?: boolean;
}

// 默认导出forwardRef组件必须要有JSDoc注释, 否则会被文档生成器忽略
/** ref属性会转发至button元素 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => {
		const {
			color = "default",
			size,
			sharp,
			shape,
			ghost,
			link,
			glass,
			wide,
			fullWidth,
			soft,
			dash,
			outline,
			startIcon,
			endIcon,
			loading,
			loadingPosition = "left",
			className,
			children,
			...other
		} = props;

		const shapeProp = shape ?? sharp;

		return (
			<button
				ref={ref}
				type="button"
				className={clsx(
					"btn",
					{
						"btn-primary": color === "primary",
						"btn-secondary": color === "secondary",
						"btn-accent": color === "accent",
						"btn-info": color === "info",
						"btn-success": color === "success",
						"btn-warning": color === "warning",
						"btn-error": color === "error",
						"btn-neutral": color === "neutral",
						"btn-xs": size === "xs",
						"btn-sm": size === "sm",
						"btn-md": size === "md",
						"btn-lg": size === "lg",
						"btn-xl": size === "xl",
						"btn-square": shapeProp === "square",
						"btn-circle": shapeProp === "circle",
						glass: glass && !link,
						"btn-link normal-case": link,
						"btn-ghost": ghost && !link,
						"btn-wide": wide && !fullWidth,
						"btn-block": fullWidth,
						"btn-soft": soft && !ghost && !link,
						"btn-dash": dash && !ghost && !link,
						"btn-outline": outline && !ghost && !link,
					},
					className,
				)}
				{...other}
			>
				{startIcon ??
					(loading && loadingPosition === "left" && (
						<span className="loading loading-spinner" />
					))}
				{children}
				{endIcon ??
					(loading && loadingPosition === "right" && (
						<span className="loading loading-spinner" />
					))}
			</button>
		);
	},
);

Button.displayName = "@rtdui/Button";
