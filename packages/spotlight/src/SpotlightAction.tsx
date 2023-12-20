import React from "react";
import { Button, getDataProps } from "@rtdui/core";
import { useSpotlightContext } from "./Spotlight.context";
import { spotlightActions } from "./spotlight.store";
import { Highlight } from "./Hightlight";

export interface SpotlightActionProps
  extends React.ComponentPropsWithoutRef<"a"> {
  /** Action label, pass string to use in default filter */
  label?: string;

  /** Action description, pass string to use in default filter */
  description?: string;

  /** Section displayed on the left side of the label, for example, icon */
  leftSection?: React.ReactNode;

  /** Section displayed on the right side of the label, for example, hotkey */
  rightSection?: React.ReactNode;

  /** Children override default action elements, if passed, label, description and sections are hidden */
  children?: React.ReactNode;

  /** Determines whether left and right sections should have dimmed styles, `true` by default */
  dimmedSections?: boolean;

  /** Determines whether search query should be highlighted in action label, `false` by default */
  highlightQuery?: boolean;

  /** Key of `theme.colors` of any valid CSS color that will be used to highlight search query, `'yellow'` by default */
  highlightColor?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "neutral";

  /** Determines whether the spotlight should be closed when action is triggered, overrides `closeOnActionTrigger` prop set on `Spotlight` */
  closeSpotlightOnTrigger?: boolean;

  /** Keywords that are used for default filtering, not displayed anywhere, can be a string: "react,router,javascript" or an array: ['react', 'router', 'javascript'] */
  keywords?: string | string[];

  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "neutral";
}

const defaultProps: Partial<SpotlightActionProps> = {
  dimmedSections: true,
  highlightQuery: false,
};

export const SpotlightAction = React.forwardRef<
  HTMLAnchorElement,
  SpotlightActionProps
>((props, ref) => {
  props = { ...defaultProps, ...props };
  const {
    className,
    style,
    id,
    description,
    label,
    leftSection,
    rightSection,
    children,
    dimmedSections,
    highlightQuery,
    highlightColor = "warning",
    closeSpotlightOnTrigger,
    onClick,
    onMouseDown,
    keywords,
    ...others
  } = props;

  const ctx = useSpotlightContext();

  const labelNode =
    highlightQuery && typeof label === "string" ? (
      <Highlight highlight={ctx.query} color={highlightColor}>
        {label}
      </Highlight>
    ) : (
      <span>{label}</span>
    );

  return (
    <a
      ref={ref}
      className="btn btn-block btn-ghost justify-start rounded-none normal-case font-normal"
      data-action
      {...others}
      onMouseDown={(event) => {
        event.preventDefault();
        onMouseDown?.(event);
      }}
      onClick={(event) => {
        onClick?.(event);
        if (closeSpotlightOnTrigger ?? ctx.closeOnActionTrigger) {
          spotlightActions.close(ctx.store);
        }
      }}
      tabIndex={-1}
    >
      {children || (
        <>
          {leftSection && (
            <span
              {...getDataProps({ position: "left", dimmed: dimmedSections })}
            >
              {leftSection}
            </span>
          )}

          <span>
            {labelNode}
            <span>{description}</span>
          </span>

          {rightSection && (
            <span
              {...getDataProps({ position: "right", dimmed: dimmedSections })}
            >
              {rightSection}
            </span>
          )}
        </>
      )}
    </a>
  );
});
