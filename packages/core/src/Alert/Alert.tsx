import { forwardRef } from "react";
import clsx from "clsx";

export interface AlertProps {
  color: "info" | "success" | "warning" | "error";
  icon?: React.ReactNode;
  title?: React.ReactNode;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  slots?: {
    actions?: string;
    body?: string;
    title?: string;
    content?: string;
  };
}
export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const { color, icon, title, content, actions, className, slots } = props;

  return (
    <div
      className={clsx(
        "alert",
        {
          "alert-info": color === "info",
          "alert-success": color === "success",
          "alert-warning": color === "warning",
          "alert-error": color === "error",
        },
        className
      )}
    >
      {/* alert最多只能有三个直接孩子 */}
      {icon}
      <div className={clsx("alert-body", slots?.body)}>
        <h3 className={clsx("font-bold", slots?.title)}>{title}</h3>
        <div className={clsx("text-xs", slots?.content)}>{content}</div>
      </div>
      <div className={clsx("alert-actions", slots?.actions)}>
        {actions}
        {/* <button className="btn btn-sm">Deny</button>
        <button className="btn btn-sm btn-primary">Accept</button> */}
      </div>
    </div>
  );
});

Alert.displayName = "@rtdui/Alert";
