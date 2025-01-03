import { useCallback, useRef, useState } from "react";
import { useClickOutside, useDirection, useId } from "@rtdui/hooks";
import type {
	ArrowPosition,
	FloatingAxesOffsets,
	FloatingPosition,
	FloatingStrategy,
} from "./Popover.types";
import { getFloatingPosition } from "./Floating/get-floating-position/get-floating-position";
import type { PortalProps } from "../Portal";
import type { TransitionProps } from "../Transition";
import { PopoverContextProvider } from "./context";
import type { PopoverMiddlewares, PopoverWidth } from "./Popover.types";
import { PopoverDropdown } from "./PopoverDropdown/PopoverDropdown";
import { PopoverTarget } from "./PopoverTarget/PopoverTarget";
import { usePopover } from "./use-popover";
import type { ThemeColor, ThemeRadius, ThemeShadow } from "../theme.types";

export interface PopoverProps {
	/** id base to create accessibility connections */
	id?: string;

	/** If set, popover dropdown will not be rendered */
	disabled?: boolean;

	/** Dropdown `z-index`
	 * @default 50
	 */
	zIndex?: string | number;

	/** Determines whether dropdown and target elements should have accessible roles
	 * @default true
	 */
	withRoles?: boolean;

	/** Key of `theme.radius` or any valid CSS value to set border-radius
	 * @default "md"
	 */
	radius?: ThemeRadius;

	/** Key of `theme.shadows` or any other valid CSS `box-shadow` value
	 * @default "md"
	 */
	shadow?: ThemeShadow;

	/** `Popover.Target` and `Popover.Dropdown` components */
	children?: React.ReactNode;

	/** Determines whether focus should be trapped within dropdown
	 * @default false
	 */
	trapFocus?: boolean;

	/** Determines whether dropdown should be closed when `Escape` key is pressed
	 * @default true
	 */
	closeOnEscape?: boolean;

	/** Determines whether dropdown should be closed on outside clicks
	 * @default true
	 */
	closeOnClickOutside?: boolean;

	/** Events that trigger outside clicks
	 * @default["mousedown", "touchstart"]
	 */
	clickOutsideEvents?: string[];

	/** Determines whether dropdown should be rendered within the `Portal`
	 * @default true
	 */
	withinPortal?: boolean;

	/** Props to pass down to the `Portal` when `withinPortal` is true */
	portalProps?: Omit<PortalProps, "children">;

	/** If set dropdown will not be unmounted from the DOM when it is hidden, `display: none` styles will be added instead */
	keepMounted?: boolean;

	/** Determines whether focus should be automatically returned to control when dropdown closes
	 * @default false
	 */
	returnFocus?: boolean;
	/**
	 * background color of dropdown and arrow, default 'bg-base-100'
	 */
	dropdownColor?: ThemeColor;

	/* --floating props-- */

	/** Dropdown position relative to the target element
	 * @default "bottom"
	 */
	position?: FloatingPosition;

	/** Called when dropdown position changes */
	onPositionChange?: (position: FloatingPosition) => void;

	/** `useEffect` dependencies to force update dropdown position
	 * @default []
	 */
	positionDependencies?: any[];

	/** Offset of the dropdown element
	 * @default 8
	 */
	offset?: number | FloatingAxesOffsets;

	/** Props passed down to the `Transition` component that used to animate dropdown presence, use to configure duration and animation type
	 * @default{duration: 150, transition: 'fade'}
	 */
	transitionProps?: Omit<TransitionProps, "children">;

	/** Dropdown width, or `'target'` to make dropdown width the same as target element
	 * @default "max-content"
	 */
	width?: PopoverWidth;

	/** Floating ui middlewares to configure position handling
	 * @default{ flip: true, shift: true, inline: false }
	 */
	middlewares?: PopoverMiddlewares;

	/** Determines whether component should have an arrow
	 * @default false
	 */
	withArrow?: boolean;

	/** Arrow size in px
	 * @default 7
	 */
	arrowSize?: number;

	/** Arrow offset in px
	 * @default 10 */
	arrowOffset?: number;

	/** Arrow `border-radius` in px
	 * @default 0
	 */
	arrowRadius?: number;

	/** Arrow position
	 * @default "side"
	 */
	arrowPosition?: ArrowPosition;

	/** Changes floating ui [position strategy](https://floating-ui.com/docs/usefloating#strategy)
	 * @default "absolute"
	 */
	floatingStrategy?: FloatingStrategy;

	/** Controlled dropdown opened state */
	opened?: boolean;

	/** Initial opened state for uncontrolled component */
	defaultOpened?: boolean;

	/** Called with current state when dropdown opens or closes */
	onChange?: (opened: boolean) => void;

	/** Called when dropdown closes */
	onClose?: () => void;

	/** Called when dropdown opens */
	onOpen?: () => void;
}

export function Popover(props: PopoverProps) {
	const {
		children,
		id,
		withRoles = true,
		disabled,
		returnFocus = false,
		keepMounted,
		trapFocus = false,
		zIndex = 50,
		radius = "md",
		shadow = "md",
		withinPortal = true,
		portalProps,
		transitionProps = { transition: "fade", duration: 150 },
		closeOnClickOutside = true,
		closeOnEscape = true,
		clickOutsideEvents = ["mousedown", "touchstart"],
		dropdownColor,
		/* --floating props-- */
		position = "bottom",
		offset = 8,
		onPositionChange,
		positionDependencies = [],
		opened,
		defaultOpened,
		onClose,
		onOpen,
		onChange,
		width = "max-content",
		middlewares = { flip: true, shift: true, inline: false },
		withArrow = false,
		arrowSize = 7,
		arrowOffset = 10,
		arrowRadius = 0,
		arrowPosition = "side",
		floatingStrategy,
		...others
	} = props;

	const arrowRef = useRef<HTMLDivElement | null>(null);
	const [targetNode, setTargetNode] = useState<HTMLElement | null>(null);
	const [dropdownNode, setDropdownNode] = useState<HTMLElement | null>(null);
	const dir = useDirection();

	const uid = useId(id);
	const popover = usePopover({
		middlewares,
		width,
		position: getFloatingPosition(dir, position!),
		offset:
			typeof offset === "number"
				? offset + (withArrow ? arrowSize! / 2 : 0)
				: offset!,
		arrowRef,
		arrowOffset: arrowOffset!,
		onPositionChange,
		positionDependencies,
		opened,
		defaultOpened,
		onChange,
		onOpen,
		onClose,
		strategy: floatingStrategy,
	});

	useClickOutside(
		() => closeOnClickOutside && popover.close(),
		clickOutsideEvents,
		[targetNode, dropdownNode],
	);

	const reference = useCallback(
		(node: HTMLElement) => {
			setTargetNode(node);
			popover.floating.refs.setReference(node);
		},
		[popover.floating.refs.setReference],
	);

	const floating = useCallback(
		(node: HTMLElement) => {
			setDropdownNode(node);
			popover.floating.refs.setFloating(node);
		},
		[popover.floating.refs.setFloating],
	);

	return (
		<PopoverContextProvider
			value={{
				disabled,
				opened: popover.opened,
				trapFocus,
				withinPortal,
				portalProps,
				returnFocus,
				controlled: popover.controlled,
				transitionProps,
				zIndex,
				radius,
				shadow,
				closeOnEscape,
				close: popover.close,
				toggle: popover.toggle,
				getTargetId: () => `${uid}-target`,
				getDropdownId: () => `${uid}-dropdown`,
				withRoles,
				targetProps: others,
				keepMounted,
				dropdownColor,
				/*--floating--*/
				reference,
				floating,
				placement: popover.floating.placement,
				x: popover.floating.x!,
				y: popover.floating.y!,
				width,
				withArrow,
				arrowX: popover.floating?.middlewareData?.arrow?.x,
				arrowY: popover.floating?.middlewareData?.arrow?.y,
				arrowRef,
				arrowSize: arrowSize!,
				arrowOffset: arrowOffset!,
				arrowRadius: arrowRadius!,
				arrowPosition: arrowPosition!,
			}}
		>
			{children}
		</PopoverContextProvider>
	);
}

Popover.Target = PopoverTarget;
/** @deprecated use `Popover.Target` instand */
Popover.Trigger = PopoverTarget;
Popover.Dropdown = PopoverDropdown;

Popover.displayName = "@rtdui/core/Popover";
