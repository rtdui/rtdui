import { forwardRef } from "react";
import clsx from "clsx";
import { useRandomClassName } from "@rtdui/hooks";
import {
	filterProps,
	getBreakpoints,
	getResponsiveBaseValue,
	getSortedBreakpoints,
} from "../utils";
import type { ResponsiveProp } from "../utils";
import { InlineStyles } from "../InlineStyles/InlineStyles";
import { GridProvider } from "./context";
import { Col, type GridColProps } from "./Col";

interface GridVariablesProps extends GridProps {
	selector: string;
}
function GridVariables({
	justify,
	align,
	gutter,
	selector,
}: GridVariablesProps) {
	const baseStyles: Record<string, string | undefined> = filterProps({
		"--grid-gutter": getResponsiveBaseValue(gutter),
		"--grid-justify": justify,
		"--grid-align": align,
	});

	const queries = Object.keys(getBreakpoints()).reduce<
		Record<string, Record<string, any>>
	>((acc, breakpoint) => {
		if (!acc[breakpoint]) {
			acc[breakpoint] = {};
		}

		if (typeof gutter === "object" && gutter[breakpoint] !== undefined) {
			acc[breakpoint]["--grid-gutter"] = gutter[breakpoint];
		}

		return acc;
	}, {});

	const sortedBreakpoints = getSortedBreakpoints(Object.keys(queries)).filter(
		(breakpoint) => Object.keys(queries[breakpoint.value]).length > 0,
	);

	const media = sortedBreakpoints.map((breakpoint) => ({
		query: `(min-width: ${breakpoint.px}px)`,
		styles: queries[breakpoint.value],
	}));

	return <InlineStyles styles={baseStyles} media={media} selector={selector} />;
}

export interface GridProps {
	/**
	 * 总共列数
	 * @default 12
	 */
	columns?: number;
	/**
	 * 设置 `justify-content` css规则
	 * @default flex-start
	 */
	justify?: React.CSSProperties["justifyContent"];
	/**
	 * 设置 `align-items` css规则
	 * @default stretch
	 */
	align?: React.CSSProperties["alignItems"];
	/**
	 * 设置 `gap` css规则
	 * @default 4px
	 */
	gutter?: ResponsiveProp<string>;
	/**
	 * 最后一行中的列是否填充所有剩余空间.
	 * @default false
	 */
	grow?: boolean;
	/** 孩子必须是Col组件 */
	children?: React.ReactElement<GridColProps, typeof Col>[];
}

const Grid_ = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
	const {
		columns = 12,
		grow = false,
		justify = "flex-start",
		align = "stretch",
		gutter = "4px",
		children,
	} = props;

	const responsiveClassName = useRandomClassName();

	return (
		<GridProvider value={{ columns, grow }}>
			<GridVariables
				selector={`.${responsiveClassName}`}
				gutter={gutter}
				justify={justify}
				align={align}
			/>
			<div
				className={clsx("grid-root", "overflow-hidden", responsiveClassName)}
			>
				<div
					className={clsx(
						"grid-inner",
						"flex flex-wrap [justify-content:var(--grid-justify)] [align-items:var(--grid-align)]",
						"[width:calc(100%+var(--grid-gutter))]",
						"margin:calc(var(--grid-gutter)/-2);",
					)}
				>
					{children}
				</div>
			</div>
		</GridProvider>
	);
});

Grid_.displayName = "@rtdui/Grid";

export const Grid = Object.assign(Grid_, { Col });
