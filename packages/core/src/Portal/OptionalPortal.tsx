import { Portal, type PortalProps } from "./Portal";

export interface OptionalPortalProps extends PortalProps {
  /** Determines whether children should be rendered inside `<Portal />`
   * @default true
   */
  withinPortal?: boolean;
}

/** 根据withinPortal属性决定是否作为portal渲染 */
export function OptionalPortal(props: OptionalPortalProps) {
  const { withinPortal = true, children, ...others } = props;
  if (withinPortal) {
    return <Portal {...others}>{children}</Portal>;
  }

  return <>{children}</>;
}
