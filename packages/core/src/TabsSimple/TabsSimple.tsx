import {
	forwardRef,
	useState,
	useImperativeHandle,
	Children,
	cloneElement,
} from "react";
import clsx from "clsx";
import { TabsSimplePanel, type TabsSimplePanelProps } from "./TabsSimplePanel";
import type { ThemeBaseSize } from "../theme.types";

export interface TabsSimpleProps {
	/**
	 * 变体
	 * @default lifted
	 */
	variant?: "border" | "box" | "lift";
	position?: "top" | "bottom";
	/** 尺寸
	 * @default "md"
	 */
	size?: ThemeBaseSize;
	children: React.ReactElement<TabsSimplePanelProps, typeof TabsSimplePanel>[];
	className?: string;
	initIndex?: number;
}

const Tabs_ = forwardRef<HTMLDivElement, TabsSimpleProps>((props, ref) => {
	const {
		initIndex = 0,
		variant = "lift",
		position,
		size = "md",
		children,
		className,
		...other
	} = props;

	const [activeIndex, setActiveIndex] = useState(initIndex);

	useImperativeHandle<HTMLDivElement, any>(ref, () => ({
		setIndex(index: number) {
			setActiveIndex(index);
		},
	}));

	return (
		<div className="grid">
			<div
				className={clsx(
					"tabs",
					"justify-self-start",
					{
						"tabs-xs": size === "xs",
						"tabs-sm": size === "sm",
						"tabs-md": size === "md",
						"tabs-lg": size === "lg",
						"tabs-top": position === "top",
						"tabs-bottom": position === "bottom",
						"tabs-border": variant === "border",
						"tabs-box": variant === "box",
						"tabs-lift": variant === "lift",
					},
					className,
				)}
			>
				{Children.map(children, (child, index) => (
					<button
						key={index}
						type="button"
						className={clsx("tab", {
							"tab-disabled": child.props.disabled,
							"tab-active": activeIndex === index,
							"[--tab-border-color:transparent]": activeIndex !== index,
						})}
						disabled={child.props.disabled}
						onClick={(e) => setActiveIndex(index)}
					>
						{child.props.label}
					</button>
				))}
			</div>

			{Children.map(children, (child, index) =>
				cloneElement(child, { index, value: activeIndex, variant }),
			)}
		</div>
	);
});

Tabs_.displayName = "@rtdui/TabsSimple";

export const TabsSimple = Object.assign(Tabs_, { TabsSimplePanel });
