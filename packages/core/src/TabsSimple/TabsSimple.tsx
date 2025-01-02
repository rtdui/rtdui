import {
	forwardRef,
	useState,
	useImperativeHandle,
	Children,
	cloneElement,
} from "react";
import clsx from "clsx";
import { TabsSimplePanel, type TabsSimplePanelProps } from "./TabsSimplePanel";

export interface TabsSimpleProps {
	/**
	 * 变体
	 * @default lifted
	 */
	variant?: "bordered" | "lifted" | "boxed";
	/** 尺寸
	 * @default "md"
	 */
	size?: "xs" | "sm" | "md" | "lg";
	children: React.ReactElement<TabsSimplePanelProps, typeof TabsSimplePanel>[];
	className?: string;
	initIndex?: number;
}

const Tabs_ = forwardRef<HTMLDivElement, TabsSimpleProps>((props, ref) => {
	const {
		initIndex = 0,
		variant = "lifted",
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
						"tabs-bordered": variant === "bordered",
						"tabs-lifted": variant === "lifted",
						"tabs-boxed": variant === "boxed",
						"tabs-xs": size === "xs",
						"tabs-sm": size === "sm",
						"tabs-md": size === "md",
						"tabs-lg": size === "lg",
						"-mb-[var(--tab-border)]": variant === "lifted",
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
				{/* 占位tab */}
				{/* {variant === "lifted" && (
          <div className="tab mr-6 flex-1 cursor-default [--tab-border-color:transparent]" />
        )} */}
			</div>

			{Children.map(children, (child, index) =>
				cloneElement(child, { index, value: activeIndex, variant }),
			)}
		</div>
	);
});

Tabs_.displayName = "@rtdui/TabsSimple";

export const TabsSimple = Object.assign(Tabs_, { TabsSimplePanel });
