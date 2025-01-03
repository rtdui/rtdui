import type React from "react";
import { useClipboard } from "@rtdui/hooks";

export interface CopyButtonProps {
	/** Value that will be copied to the clipboard when the button is clicked */
	value: string;

	/**
	 * Copied status timeout in ms
	 * @default 1000
	 */
	timeout?: number;

	/** Children callback, provides current status and copy function as an argument */
	children: (payload: { copied: boolean; copy: () => void }) => React.ReactNode;
}

export const CopyButton = function CopyButton(props: CopyButtonProps) {
	const { children, timeout = 1000, value, ...others } = props;

	const clipboard = useClipboard({ timeout });
	const copy = () => clipboard.copy(value);

	return <>{children({ copy, copied: clipboard.copied, ...others })}</>;
};
