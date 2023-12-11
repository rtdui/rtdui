import React from "react";
import clsx from "clsx";
import { Button } from "@rtdui/core";
import { IconX } from "@tabler/icons-react";

export interface NotificationProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title" | "content"> {
  /** Called when close button is clicked */
  onClose?: () => void;

  /** Notification color */
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "transparent";

  /** Notification icon, replaces color line */
  icon?: React.ReactNode;

  /** Notification title, displayed before body */
  title?: React.ReactNode;

  /** Notification message, place main text here */
  children?: React.ReactNode;

  /** Replaces colored line or icon with Loader component */
  loading?: boolean;

  /** Determines whether close button should be visible, true by default */
  withCloseButton?: boolean;

  slots?: {
    icon?: string;
    title?: string;
    content?: string;
    closeBtn?: string;
  };
}

export const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  (props, ref) => {
    const {
      className,
      color = "info",
      loading,
      withCloseButton = true,
      title,
      icon,
      children,
      onClose,
      slots,
      ...others
    } = props;

    const colorClass = [
      color === "primary"
        ? "bg-primary text-primary-content"
        : color === "secondary"
        ? "bg-secondary text-secondary-content"
        : color === "accent"
        ? "bg-accent text-accent-content"
        : color === "info"
        ? "bg-info text-info-content"
        : color === "success"
        ? "bg-success text-success-content"
        : color === "warning"
        ? "bg-warning text-warning-content"
        : color === "error"
        ? "bg-error text-error-content"
        : "",
    ];

    return (
      <div
        className={clsx(
          "flex gap-4 items-center rounded-box shadow-md p-3 max-h-52 min-w-[300px] bg-base-200",
          className
        )}
        data-with-icon={!!icon || loading || undefined}
        role="alert"
        ref={ref}
        {...others}
      >
        {!loading && icon && (
          <span
            className={clsx(
              "w-6 h-6 flex items-center justify-center rounded-full",
              colorClass,
              slots?.icon
            )}
          >
            {icon}
          </span>
        )}
        {/* loading类使用了aspect-ratio, 而iOS 15以下不支持 aspect-ratio, 这里手动设置了md尺寸的height */}
        {loading && (
          <span
            className={clsx(
              "loading loading-spinner h-[1.5rem]",
              colorClass,
              slots?.icon
            )}
          />
        )}
        {!loading && !icon && (
          <span
            className={clsx("w-1.5 h-11 rounded", colorClass, slots?.icon)}
          />
        )}
        <div className="flex-grow">
          {title && (
            <h3 className={clsx("font-bold", slots?.title)}>{title}</h3>
          )}
          <div className={clsx(slots?.content)}>{children}</div>
        </div>
        {withCloseButton && (
          <Button
            onClick={onClose}
            className={clsx("btn btn-sm btn-circle btn-ghost", slots?.closeBtn)}
          >
            <IconX />
          </Button>
        )}
      </div>
    );
  }
);

Notification.displayName = "Notification";
