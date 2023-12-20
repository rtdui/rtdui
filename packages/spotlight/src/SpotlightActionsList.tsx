import React, { useEffect, useId } from "react";
import { useSpotlightContext } from "./Spotlight.context";
import { spotlightActions } from "./spotlight.store";

export type SpotlightActionsListStylesNames =
  | "actionsList"
  | "actionsListInner";

export interface SpotlightActionsListProps
  extends React.ComponentPropsWithoutRef<"div"> {}

const defaultProps: Partial<SpotlightActionsListProps> = {};

export const SpotlightActionsList = React.forwardRef<
  HTMLDivElement,
  SpotlightActionsListProps
>((props, ref) => {
  const { className, style, id, children, ...others } = props;
  const ctx = useSpotlightContext();
  const generatedId = `rtdui-${useId().replace(/:/g, "")}`;
  const listId = id || generatedId;

  useEffect(() => {
    spotlightActions.setListId(listId, ctx.store);
    return () => spotlightActions.setListId("", ctx.store);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listId]);

  return (
    <div ref={ref} id={listId} {...others}>
      {children}
    </div>
  );
});
