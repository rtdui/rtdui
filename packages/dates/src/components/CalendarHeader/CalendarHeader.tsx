import { forwardRef } from "react";
import { Box, type ThemeSize, getSize } from "@rtdui/core";
import clsx from "clsx";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export interface CalendarHeaderSettings {
	__preventFocus?: boolean;

	/** Determines whether propagation for Escape key should be stopped */
	__stopPropagation?: boolean;

	/** Change next icon */
	nextIcon?: React.ReactNode;

	/** Change previous icon */
	previousIcon?: React.ReactNode;

	/** aria-label for next button */
	nextLabel?: string;

	/** aria-label for previous button */
	previousLabel?: string;

	/** Called when next button is clicked */
	onNext?: () => void;

	/** Called when previous button is clicked */
	onPrevious?: () => void;

	/** Called when level button is clicked */
	onLevelClick?: () => void;

	/** Determines whether next control should be disabled, defaults to false */
	nextDisabled?: boolean;

	/** Determines whether previous control should be disabled, defaults to false */
	previousDisabled?: boolean;

	/** Determines whether next level button should be enabled, defaults to true */
	hasNextLevel?: boolean;

	/** Determines whether next control should be rendered, defaults to true */
	withNext?: boolean;

	/** Determines whether previous control should be rendered, defaults to true */
	withPrevious?: boolean;

	/** Component size */
	size?: ThemeSize;
}

export interface CalendarHeaderProps
	extends CalendarHeaderSettings,
		React.ComponentPropsWithoutRef<"div"> {
	/** Label displayed between next and previous buttons */
	label: React.ReactNode;

	/** aria-label for level control */
	levelControlAriaLabel?: string;

	slots?: {
		previous?: string;
		next?: string;
	};
}

// const varsResolver = createVarsResolver<CalendarHeaderFactory>(
//   (_, { size }) => ({
//     calendarHeader: {
//       "--dch-control-size": getSize(size, "dch-control-size"),
//       "--dch-fz": getFontSize(size),
//     },
//   })
// );

export const CalendarHeader = forwardRef<HTMLDivElement, CalendarHeaderProps>(
	(props, ref) => {
		const {
			className,
			style,
			nextIcon,
			previousIcon,
			nextLabel,
			previousLabel,
			onNext,
			onPrevious,
			onLevelClick,
			label,
			nextDisabled = false,
			previousDisabled = false,
			hasNextLevel = true,
			levelControlAriaLabel,
			withNext = true,
			withPrevious = true,
			__preventFocus,
			__stopPropagation,
			size,
			slots,
			...others
		} = props;

		const preventFocus = __preventFocus
			? (event: React.MouseEvent<HTMLElement>) => event.preventDefault()
			: undefined;

		return (
			<div
				ref={ref}
				className={clsx(
					"calendarHeader",
					"flex",
					"[--dch-control-size-xs:1.875rem]",
					"[--dch-control-size-sm:2.25rem]",
					"[--dch-control-size-md:2.625rem]",
					"[--dch-control-size-lg:3rem]",
					"[--dch-control-size-xl:3.375rem]",
					"[--dch-control-size:var(--dch-control-size-sm)]",
					className,
				)}
				style={
					{
						...style,
						"--dch-control-size": getSize(size, "dch-control-size"),
					} as any
				}
				{...others}
			>
				{withPrevious && (
					<button
						className={clsx(
							"calendarHeaderControl",
							"btn btn-ghost btn-square min-h-0 disabled:bg-base-100",
							"w-[--dch-control-size] h-[--dch-control-size]",
							slots?.previous,
						)}
						data-direction="previous"
						aria-label={previousLabel}
						onClick={onPrevious}
						onMouseDown={preventFocus}
						disabled={previousDisabled}
						data-disabled={previousDisabled || undefined}
						tabIndex={__preventFocus || previousDisabled ? -1 : 0}
						data-rtdui-stop-propagation={__stopPropagation || undefined}
					>
						{previousIcon || (
							<IconChevronLeft
								size={20}
								className={clsx("calendarHeaderControlIcon", "z-100")}
							/>
						)}
					</button>
				)}

				<Box<any>
					as={hasNextLevel ? "button" : "div"}
					className={clsx(
						"calendarHeaderLevel",
						"btn btn-ghost min-h-0",
						"h-[--dch-control-size]",
						"flex-1 flex justify-center items-center",
						{ "[&&&]:bg-base-100": !hasNextLevel },
					)}
					onClick={hasNextLevel ? onLevelClick : undefined}
					onMouseDown={hasNextLevel ? preventFocus : undefined}
					disabled={!hasNextLevel}
					data-static={!hasNextLevel || undefined}
					aria-label={levelControlAriaLabel}
					tabIndex={__preventFocus || !hasNextLevel ? -1 : 0}
					data-rtdui-stop-propagation={__stopPropagation || undefined}
				>
					{label}
				</Box>

				{withNext && (
					<button
						className={clsx(
							"calendarHeaderControl",
							"btn btn-ghost btn-square min-h-0 disabled:bg-base-100",
							"min-h-0 w-[--dch-control-size] h-[--dch-control-size]",
							slots?.next,
						)}
						data-direction="next"
						aria-label={nextLabel}
						onClick={onNext}
						onMouseDown={preventFocus}
						disabled={nextDisabled}
						data-disabled={nextDisabled || undefined}
						tabIndex={__preventFocus || nextDisabled ? -1 : 0}
						data-rtdui-stop-propagation={__stopPropagation || undefined}
					>
						{nextIcon || (
							<IconChevronRight
								size={20}
								className={clsx("calendarHeaderControl")}
							/>
						)}
					</button>
				)}
			</div>
		);
	},
);

CalendarHeader.displayName = "@rtdui/dates/CalendarHeader";
