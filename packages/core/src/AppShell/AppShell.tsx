import { forwardRef, useId, useRef, useImperativeHandle } from "react";
import clsx from "clsx";

export interface AppShellProps
	extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> {
	header?: React.ReactElement;
	footer?: React.ReactElement;
	main?: React.ReactElement;
	drawer?: React.ReactElement;
	/** 响应式断点
	 * @default "lg"
	 */
	responsive?: "md" | "lg" | "xl" | "2xl";
	slots?: {
		/** body是header,main,footer的容器 */
		body?: string;
		header?: string;
		main?: string;
		footer?: string;
		/** side是drawer的容器 */
		side?: string;
		drawer?: string;
	};
}

export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
	(props, ref) => {
		const {
			header,
			footer,
			main,
			drawer,
			responsive = "lg",
			className,
			slots,
			...other
		} = props;

		const id = useId();
		const toggleRef = useRef<HTMLInputElement>(null!);

		useImperativeHandle(
			ref,
			() =>
				({
					toggle: () => toggleRef.current.click(),
					close: () => (toggleRef.current.checked = false),
				}) as any,
		);

		return (
			<div
				className={clsx(
					"appShell",
					"drawer",
					{
						"md:drawer-open": responsive === "md",
						"lg:drawer-open": responsive === "lg",
						"xl:drawer-open": responsive === "xl",
						"2xl:drawer-open": responsive === "2xl",
					},
					className,
				)}
			>
				<input
					id={id}
					ref={toggleRef}
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className={clsx("drawer-content", slots?.body)}>
					{/* header */}
					<div className={clsx("appshell-header", slots?.header)}>{header}</div>
					{/* main */}
					<div className={clsx("appshell-main", slots?.main)}>{main}</div>
					{/* footer */}
					<div className={clsx("appshell-footer", slots?.footer)}>{footer}</div>
				</div>
				<div className={clsx("drawer-side", slots?.side)}>
					<label
						htmlFor={id}
						aria-label="close sidebar"
						className="drawer-overlay"
					/>
					<div className={clsx("appshell-drawer", slots?.drawer)}>{drawer}</div>
				</div>
			</div>
		);
	},
);

AppShell.displayName = "@rtdui/AppShell";
