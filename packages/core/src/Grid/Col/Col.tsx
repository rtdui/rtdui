import { forwardRef } from "react";
import clsx from "clsx";
import { useRandomClassName } from "@rtdui/hooks";
import {
	filterProps,
	getBreakpoints,
	getResponsiveBaseValue,
	getSortedBreakpoints,
} from "../../utils";
import type { ResponsiveProp } from "../../utils";
import { useGridContext } from "../context";
import { InlineStyles } from "../../InlineStyles/InlineStyles";

export type ColSpan = number | "auto" | "content";

const getColumnFlexBasis = (colSpan: ColSpan | undefined, columns: number) => {
	if (colSpan === "content") {
		return "auto";
	}

	if (colSpan === "auto") {
		return "0rem";
	}

	return colSpan ? `${100 / (columns / colSpan)}%` : undefined;
};

const getColumnMaxWidth = (
	colSpan: ColSpan | undefined,
	columns: number,
	grow: boolean | undefined,
) => {
	if (grow || colSpan === "auto" || colSpan === "content") {
		return "unset";
	}

	return getColumnFlexBasis(colSpan, columns);
};
const getColumnFlexGrow = (
	colSpan: ColSpan | undefined,
	grow: boolean | undefined,
) => {
	if (!colSpan) {
		return undefined;
	}

	return colSpan === "auto" || grow ? "1" : undefined;
};

const getColumnOffset = (offset: number | undefined, columns: number) =>
	offset === 0 ? "0" : offset ? `${100 / (columns / offset)}%` : undefined;

interface GridColVariablesProps {
	selector: string;
	span: GridColProps["span"] | undefined;
	order?: GridColProps["order"] | undefined;
	offset?: GridColProps["offset"] | undefined;
}
function GridColVariables({
	span,
	order,
	offset,
	selector,
}: GridColVariablesProps) {
	const ctx = useGridContext();

	const baseValue = getResponsiveBaseValue(span);
	const baseSpan = baseValue === undefined ? 12 : getResponsiveBaseValue(span);

	const baseStyles: Record<string, string | undefined> = filterProps({
		"--col-order": getResponsiveBaseValue(order)?.toString(),
		"--col-flex-grow": getColumnFlexGrow(baseSpan, ctx.grow),
		"--col-flex-basis": getColumnFlexBasis(baseSpan, ctx.columns),
		"--col-width": baseSpan === "content" ? "auto" : undefined,
		"--col-max-width": getColumnMaxWidth(baseSpan, ctx.columns, ctx.grow),
		"--col-offset": getColumnOffset(
			getResponsiveBaseValue(offset),
			ctx.columns,
		),
	});

	const queries = Object.keys(getBreakpoints()).reduce<
		Record<string, Record<string, any>>
	>((acc, breakpoint) => {
		if (!acc[breakpoint]) {
			acc[breakpoint] = {};
		}

		if (typeof order === "object" && order[breakpoint] !== undefined) {
			acc[breakpoint]["--col-order"] = order[breakpoint]?.toString();
		}

		if (typeof span === "object" && span[breakpoint] !== undefined) {
			acc[breakpoint]["--col-flex-grow"] = getColumnFlexGrow(
				span[breakpoint],
				ctx.grow,
			);
			acc[breakpoint]["--col-flex-basis"] = getColumnFlexBasis(
				span[breakpoint],
				ctx.columns,
			);
			acc[breakpoint]["--col-width"] =
				span[breakpoint] === "content" ? "auto" : undefined;
			acc[breakpoint]["--col-max-width"] = getColumnMaxWidth(
				span[breakpoint],
				ctx.columns,
				ctx.grow,
			);
		}

		if (typeof offset === "object" && offset[breakpoint] !== undefined) {
			acc[breakpoint]["--col-offset"] = getColumnOffset(
				offset[breakpoint],
				ctx.columns,
			);
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

export interface GridColProps {
	span?: ResponsiveProp<ColSpan>;
	offset?: ResponsiveProp<number>;
	order?: ResponsiveProp<number>;
	children?: React.ReactNode;
}

export const Col = forwardRef<HTMLDivElement, GridColProps>((props, ref) => {
	const { span = 12, offset, order, children } = props;

	const responsiveClassName = useRandomClassName();

	return (
		<>
			<GridColVariables
				selector={`.${responsiveClassName}`}
				span={span}
				order={order}
				offset={offset}
			/>
			<div
				className={clsx(
					responsiveClassName,
					"gridx-col",
					"shrink-0 [flex-grow:var(--col-flex-grow,0)]",
					"[order:var(--col-order)]",
					"[flex-basis:var(--col-flex-basis)]",
					"[width:var(--col-width)]",
					"[max-width:var(--col-max-width)]",
					String.raw`[margin-left:var(--\_col-ml,var(--col-offset,0))] [margin-right:var(--\_col-mr,0)]`,
					"[padding:calc(var(--grid-gutter)/2)]",
				)}
			>
				{children}
			</div>
		</>
	);
});

Col.displayName = "@rtdui/Col";
