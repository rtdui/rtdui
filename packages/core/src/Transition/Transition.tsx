import type React from "react";
import { useRef } from "react";
import { Transition as ReactTransition } from "react-transition-group";
import { getTransitionStyles } from "./get-transition-styles";
import type { TransitionType } from "./transitions";

export type TransitionDuration =
	| number
	| { appear?: number; enter?: number; exit?: number };
export interface TransitionProps {
	/** 进入过渡 */
	in?: boolean;
	/**
	 * 过渡名称
	 * @default "fade"
	 */
	transition?: TransitionType;
	/**
	 * Transition duration in ms
	 * @default 250
	 */
	duration?: TransitionDuration;
	/**
	 * 过渡缓动函数
	 * @default "ease"
	 */
	timingFunction?: string;
	/** 是否in为true时挂载时执行过渡 */
	appear?: boolean;
	/** 退场过渡完成后是否卸载组件, 初始时不挂载组件
	 * @default true
	 */
	unmountOnExit?: boolean;
	children: (
		ref: React.MutableRefObject<any>,
		styles: React.CSSProperties,
	) => JSX.Element;
}
export function Transition(props: TransitionProps) {
	const {
		in: inProp,
		transition = "fade",
		duration = 250,
		timingFunction = "ease",
		appear = false,
		unmountOnExit = false,
		children,
		...other
	} = props;

	const ref = useRef(null!);

	const transitionDuration =
		typeof duration === "number"
			? { appear: 0, enter: duration, exit: duration }
			: duration;

	return (
		<ReactTransition
			in={inProp}
			nodeRef={ref}
			appear={appear}
			timeout={transitionDuration}
			unmountOnExit={unmountOnExit}
		>
			{(status) =>
				children(
					ref,
					getTransitionStyles({
						transition,
						duration,
						status,
						timingFunction,
					}),
				)
			}
		</ReactTransition>
	);
}
