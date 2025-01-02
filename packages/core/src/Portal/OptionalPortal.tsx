import { Portal, PortalProps } from "./Portal";

export interface OptionalPortalProps extends PortalProps {
	/** Determines whether children should be rendered inside `<Portal />`
	 * @default true
	 */
	withinPortal?: boolean;
}

/** 根据withinPortal属性决定是否作为portal渲染 */
export function OptionalPortal({
	withinPortal = true,
	children,
	...others
}: OptionalPortalProps) {
	if (withinPortal) {
		return <Portal {...others}>{children}</Portal>;
	}

	return <>{children}</>;
}

OptionalPortal.displayName = "@rtdui/core/OptionalPortal";
