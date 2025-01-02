import { forwardRef } from "react";
import { ModalBody } from "./ModalBody";
import {
	ModalCloseButton,
	type ModalCloseButtonProps,
} from "./ModalCloseButton";
import { ModalContent } from "./ModalContent";
import { ModalHeader } from "./ModalHeader";
import { ModalOverlay, type ModalOverlayProps } from "./ModalOverlay";
import { ModalRoot, ModalRootProps } from "./ModalRoot";
import { ModalTitle } from "./ModalTitle";

export interface ModalProps extends ModalRootProps {
	/** Modal title */
	title?: React.ReactNode;

	/** Determines whether the overlay should be rendered, `true` by default */
	withOverlay?: boolean;

	/** Props passed down to the `Overlay` component, use to configure opacity, `background-color`, styles and other properties */
	overlayProps?: ModalOverlayProps;

	/** Determines whether the close button should be rendered, `true` by default */
	withCloseButton?: boolean;

	/** Props passed down to the close button */
	closeButtonProps?: ModalCloseButtonProps;

	/** Modal content */
	children?: React.ReactNode;
}

export const Modal_ = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
	const {
		title,
		withinPortal = true,
		closeOnClickOutside = true,
		lockScroll = true,
		trapFocus = true,
		returnFocus = true,
		closeOnEscape = true,
		keepMounted = false,
		zIndex = 200,
		transitionProps = { duration: 200, transition: "fade" },
		withOverlay = true,
		overlayProps = {},
		withCloseButton = true,
		closeButtonProps = {},
		children,
		radius,
		fullScreen,
		...others
	} = props;

	const hasHeader = !!title || withCloseButton;

	return (
		<ModalRoot
			ref={ref}
			radius={radius}
			closeOnClickOutside={closeOnClickOutside}
			lockScroll={lockScroll}
			withinPortal={withinPortal}
			trapFocus={trapFocus}
			returnFocus={returnFocus}
			closeOnEscape={closeOnEscape}
			keepMounted={keepMounted}
			zIndex={zIndex}
			transitionProps={transitionProps}
			fullScreen={fullScreen}
			{...others}
		>
			{withOverlay && <ModalOverlay {...overlayProps} />}
			<ModalContent radius={radius} fullScreen={fullScreen}>
				{hasHeader && (
					<ModalHeader>
						{title ? (
							<ModalTitle>{title}</ModalTitle>
						) : (
							<div className="flex-1" />
						)}
						{withCloseButton && <ModalCloseButton {...closeButtonProps} />}
					</ModalHeader>
				)}

				<ModalBody>{children}</ModalBody>
			</ModalContent>
		</ModalRoot>
	);
});

Modal_.displayName = "@rtdui/core/Modal";

export const Modal = Object.assign(Modal_, {
	Root: ModalRoot,
	Overlay: ModalOverlay,
	Content: ModalContent,
	Body: ModalBody,
	Header: ModalHeader,
	Title: ModalTitle,
	CloseButton: ModalCloseButton,
});
