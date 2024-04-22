import { forwardRef, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useIsomorphicEffect, assignRef } from "@rtdui/hooks";

function createPortalNode(props: Omit<PortalProps, "children">) {
  const node = document.createElement("div");
  node.setAttribute("data-portal", "true");
  if (props.type) {
    node.setAttribute("data-type", props.type);
  }
  typeof props.className === "string" &&
    node.classList.add(...props.className.split(" ").filter(Boolean));
  typeof props.style === "object" && Object.assign(node.style, props.style);
  typeof props.id === "string" && node.setAttribute("id", props.id);
  return node;
}

export interface PortalProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Portal children, for example, modal or popover */
  children: React.ReactNode;

  /** Element inside which portal should be created, by default a new div element is created and appended to the `document.body` */
  target?: HTMLElement | string;

  type?: string;
}

export const Portal = forwardRef<HTMLDivElement, PortalProps>((props, ref) => {
  const { children, target, className, ...others } = props;
  const [mounted, setMounted] = useState(false);
  const nodeRef = useRef<HTMLElement | null>(null);

  useIsomorphicEffect(() => {
    setMounted(true);
    nodeRef.current = !target
      ? createPortalNode({
          ...others,
          className,
        })
      : typeof target === "string"
        ? document.querySelector(target)
        : target;

    // DOM节点赋值给引用
    assignRef(ref, nodeRef.current);

    if (!target && nodeRef.current) {
      document.body.appendChild(nodeRef.current);
    }

    return () => {
      if (!target && nodeRef.current) {
        document.body.removeChild(nodeRef.current);
      }
    };
  }, [target]);

  // SSR
  if (!mounted || !nodeRef.current) {
    return null;
  }

  return createPortal(<>{children}</>, nodeRef.current);
});

Portal.displayName = "@rtdui/Portal";
