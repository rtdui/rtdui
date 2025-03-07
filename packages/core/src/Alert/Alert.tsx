import { forwardRef } from "react";
import clsx from "clsx";

export interface AlertProps {
	color: "info" | "success" | "warning" | "error";
	icon?: React.ReactNode;
	title?: React.ReactNode;
	content?: React.ReactNode;
	actions?: React.ReactNode;
	variant?: "outline" | "dash" | "soft";
	className?: string;
	slots?: {
		actions?: string;
		body?: string;
		title?: string;
		content?: string;
	};
}
export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
	const { color, icon, title, content, actions, variant, className, slots } =
		props;

	return (
		<div
			className={clsx(
				"alert alert-vertical sm:alert-horizontal",
				{
					"alert-info": color === "info",
					"alert-success": color === "success",
					"alert-warning": color === "warning",
					"alert-error": color === "error",
					"alert-outline": variant === "outline",
					"alert-dash": variant === "dash",
					"alert-soft": variant === "soft",
				},
				className,
			)}
		>
			{icon}
			{/* alert 使用grid布局, 第二个孩子是自适应的 */}
			<div className={clsx("alert-body", slots?.body)}>
				<h3 className={clsx("font-bold", slots?.title)}>{title}</h3>
				<div className={clsx("text-xs", slots?.content)}>{content}</div>
			</div>
			{/* 第三个孩子之后是自动列 */}
			<div className={clsx("alert-actions", slots?.actions)}>
				{actions}
				{/* <button className="btn btn-sm">Deny</button>
        <button className="btn btn-sm btn-primary">Accept</button> */}
			</div>
		</div>
	);
});

Alert.displayName = "@rtdui/Alert";
