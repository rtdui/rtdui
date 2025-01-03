import { forwardRef } from "react";
import clsx from "clsx";
import { RemoveScroll } from "react-remove-scroll";
import { OptionalPortal, type PortalProps } from "../Portal";
import type { TransitionProps } from "../Transition";
import { ModalProvider } from "./context";
import { useModal } from "./use-modal";
import type { ThemeRadius, ThemeShadow, ThemeSize } from "../theme.types";
import { getRadius, getShadow, getSize, getSpacing } from "../utils";

type RemoveScrollProps = Omit<
	React.ComponentProps<typeof RemoveScroll>,
	"children"
>;

export interface ModalRootProps
	extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
	/** If set modal/drawer will not be unmounted from the DOM when it is hidden, `display: none` styles will be added instead
	 * @default false
	 */
	keepMounted?: boolean;

	/** Determines whether modal/drawer is opened */
	opened: boolean;

	/** Called when modal/drawer is closed */
	onClose: () => void;

	/** Id used to connect modal/drawer with body and title */
	id?: string;

	/** Determines whether scroll should be locked when `opened={true}`
	 * @default true
	 */
	lockScroll?: boolean;

	/** Determines whether focus should be trapped
	 * @default true
	 */
	trapFocus?: boolean;

	/** Determines whether the component should be rendered inside `Portal`
	 * @default true
	 */
	withinPortal?: boolean;

	/** Props passed down to the Portal component when `withinPortal` is set */
	portalProps?: Omit<PortalProps, "children">;

	/** Modal/drawer content */
	children?: React.ReactNode;

	/** Determines whether the modal/drawer should be closed when user clicks on the overlay
	 * @default true
	 */
	closeOnClickOutside?: boolean;

	/** Props added to the `Transition` component that used to animate overlay and body, use to configure duration and animation type
	 * @default{ duration: 200, transition: 'fade' }
	 */
	transitionProps?: Omit<TransitionProps, "children">;

	/** Determines whether `onClose` should be called when user presses the escape key
	 * @default true
	 */
	closeOnEscape?: boolean;

	/** Determines whether focus should be returned to the last active element when `onClose` is called
	 * @default true
	 */
	returnFocus?: boolean;

	/** `z-index` CSS property of the root element
	 * @default 200
	 */
	zIndex?: string | number;

	/** Key of `theme.shadows` or any valid CSS box-shadow value
	 * @default "xl"
	 */
	shadow?: ThemeShadow;

	/** Key of `theme.spacing` or any valid CSS value to set content, header and footer padding
	 * @default "md"
	 */
	padding?: ThemeSize;

	/** Controls width of the content area
	 * @default "md"
	 */
	size?: ThemeSize;

	/** Props passed down to react-remove-scroll, can be used to customize scroll lock behavior */
	removeScrollProps?: RemoveScrollProps;

	/** Key of `theme.radius` or any valid CSS value to set `border-radius`
	 * @default "md"
	 */
	radius?: ThemeRadius;

	/** Determines whether the modal should be centered vertically
	 * @default false
	 */
	centered?: boolean;

	/** Determines whether the modal should be full screen
	 * @default false
	 */
	fullScreen?: boolean;
	yOffset?: string | number;
}

export const ModalRoot = forwardRef<HTMLDivElement, ModalRootProps>(
	(props, ref) => {
		const {
			keepMounted,
			opened,
			onClose,
			id,
			transitionProps = { duration: 200, transition: "fade" },
			trapFocus,
			closeOnEscape,
			returnFocus,
			closeOnClickOutside,
			withinPortal,
			portalProps,
			lockScroll,
			children,
			size = "md",
			zIndex = 200,
			shadow = "xl",
			padding = "md",
			removeScrollProps,
			radius,
			style,
			className,
			fullScreen,
			centered,
			yOffset,
			...others
		} = props;

		const {
			_id,
			titleMounted,
			bodyMounted,
			shouldLockScroll,
			setTitleMounted,
			setBodyMounted,
		} = useModal({
			id,
			transitionProps,
			opened,
			trapFocus,
			closeOnEscape,
			onClose,
			returnFocus,
		});

		return (
			<OptionalPortal {...portalProps} withinPortal={withinPortal}>
				<ModalProvider
					value={{
						opened,
						onClose,
						closeOnClickOutside,
						transitionProps: {
							...transitionProps,
							unmountOnExit: !keepMounted,
						},
						getTitleId: () => `${_id}-title`,
						getBodyId: () => `${_id}-body`,
						titleMounted,
						bodyMounted,
						setTitleMounted,
						setBodyMounted,
						trapFocus,
						closeOnEscape,
						zIndex,
						fullScreen,
						yOffset,
					}}
				>
					<RemoveScroll
						enabled={shouldLockScroll && lockScroll}
						{...removeScrollProps}
					>
						<div
							ref={ref}
							{...others}
							className={clsx(
								"modal-root",
								"[--modal-y-offset:5dvh] [--modal-x-offset:5vw]",
								"[--modal-size-xs:320px] [--modal-size-sm:380px] [--modal-size-md:440px] [--modal-size-lg:620px] [--modal-size-xl:780px] [--modal-size:var(--modal-size-md)]",
								className,
							)}
							style={
								{
									...style,
									"--modal-z-index": zIndex.toString(),
									"--modal-shadow": getShadow(shadow),
									"--modal-padding": getSpacing(padding),
									"--modal-radius":
										radius === undefined ? undefined : getRadius(radius),
									"--modal-size":
										size === undefined
											? undefined
											: getSize(size, "modal-size"),
									"--modal-align":
										centered === undefined ? undefined : "center",
									"--modal-content-max-height": fullScreen ? "auto" : undefined,
									"--modal-content-height": fullScreen ? "100dvh" : undefined,
								} as any
							}
							data-full-screen={fullScreen || undefined}
							data-centered={centered || undefined}
						>
							{children}
						</div>
					</RemoveScroll>
				</ModalProvider>
			</OptionalPortal>
		);
	},
);

ModalRoot.displayName = "@rtdui/core/ModalRoot";
