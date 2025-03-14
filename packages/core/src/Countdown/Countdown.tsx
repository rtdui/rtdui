import { forwardRef, useState, useEffect } from "react";
import clsx from "clsx";
import { intervalToDuration, type Duration } from "date-fns";

export interface CountdownProps {
	endDate: Date;
	labelPosition?: "bottom" | "right";
	variant?: "box" | "labelInline" | "labelUnder";
	className?: string;
	/**
	 * 显示文本, 可以本地化
	 * @default '{years:"years", months:"months", days:"days", hours:"hours", minutes:"minutes", seconds:"seconds"}'
	 */
	labels?: {
		years: string;
		months: string;
		days: string;
		hours: string;
		minutes: string;
		seconds: string;
	};
}
export const Countdown = forwardRef<HTMLDivElement, CountdownProps>(
	(props, ref) => {
		const {
			endDate,
			variant = "labelUnder",
			labels = {
				years: "years",
				months: "months",
				days: "days",
				hours: "hours",
				minutes: "minutes",
				seconds: "seconds",
			},
			className,
		} = props;

		// 防止SSR和client的截止时间不一致
		const [duration, setDuration] = useState<Duration>({});

		// const duration = intervalToDuration({ start: new Date(), end: endDate });
		// const [, updateSelf] = React.useState({});

		useEffect(() => {
			const timer = setInterval(
				() =>
					setDuration(intervalToDuration({ start: new Date(), end: endDate })),
				1000,
			);
			return () => clearInterval(timer);
		}, []);

		return (
			<div
				ref={ref}
				className={clsx(
					"countdown-root",
					"grid grid-flow-col auto-cols-max gap-5 text-center",
					className,
				)}
			>
				{duration.years! > 0 && (
					<div
						className={clsx({
							"flex flex-col items-center": variant === "labelUnder",
							"flex flex-col items-center px-4 py-2 bg-neutral rounded-box text-neutral-content":
								variant === "box",
						})}
					>
						<span className="countdown font-mono text-4xl">
							<span style={{ "--value": duration.years } as any} />
						</span>
						{labels.years}
					</div>
				)}
				{(duration.years! > 0 || duration.months! > 0) && (
					<div
						className={clsx({
							"flex flex-col items-center": variant === "labelUnder",
							"flex flex-col items-center px-4 py-2 bg-neutral rounded-box text-neutral-content":
								variant === "box",
						})}
					>
						<span className="countdown font-mono text-4xl">
							<span style={{ "--value": duration.months } as any} />
						</span>
						{labels.months}
					</div>
				)}
				{(duration.years! > 0 ||
					duration.months! > 0 ||
					duration.days! > 0) && (
					<div
						className={clsx({
							"flex flex-col items-center": variant === "labelUnder",
							"flex flex-col items-center px-4 py-2 bg-neutral rounded-box text-neutral-content":
								variant === "box",
						})}
					>
						<span className="countdown font-mono text-4xl">
							<span style={{ "--value": duration.days } as any} />
						</span>
						{labels.days}
					</div>
				)}
				{(duration.years! > 0 ||
					duration.months! > 0 ||
					duration.days! > 0 ||
					duration.hours! > 0) && (
					<div
						className={clsx({
							"flex flex-col items-center": variant === "labelUnder",
							"flex flex-col items-center px-4 py-2 bg-neutral rounded-box text-neutral-content":
								variant === "box",
						})}
					>
						<span className="countdown font-mono text-4xl">
							<span style={{ "--value": duration.hours } as any} />
						</span>
						{labels.hours}
					</div>
				)}
				{(duration.years! > 0 ||
					duration.months! > 0 ||
					duration.days! > 0 ||
					duration.hours! > 0 ||
					duration.minutes! > 0) && (
					<div
						className={clsx({
							"flex flex-col items-center": variant === "labelUnder",
							"flex flex-col items-center px-4 py-2 bg-neutral rounded-box text-neutral-content":
								variant === "box",
						})}
					>
						<span className="countdown font-mono text-4xl">
							<span style={{ "--value": duration.minutes } as any} />
						</span>
						{labels.minutes}
					</div>
				)}

				{(duration.years! > 0 ||
					duration.months! > 0 ||
					duration.days! > 0 ||
					duration.hours! > 0 ||
					duration.minutes! > 0 ||
					duration.seconds! > 0) && (
					<div
						className={clsx({
							"flex flex-col items-center": variant === "labelUnder",
							"flex flex-col items-center px-4 py-2 bg-neutral rounded-box text-neutral-content":
								variant === "box",
						})}
					>
						<span className="countdown font-mono text-4xl">
							<span style={{ "--value": duration.seconds } as any} />
						</span>
						{labels.seconds}
					</div>
				)}
			</div>
		);
	},
);

Countdown.displayName = "@rtdui/Countdown";
