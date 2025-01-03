import {
	type TransitionType,
	transitions,
	type TransitionDuration,
} from "./transitions";

export const transitionStatuses = {
	entering: "in",
	entered: "in",
	exiting: "out",
	exited: "out",
	unmounted: "out",
} as const;

export function getTransitionStyles({
	transition,
	status,
	duration,
	timingFunction,
}: {
	transition: TransitionType;
	status: keyof typeof transitionStatuses;
	duration: TransitionDuration;
	timingFunction: React.CSSProperties["transitionTimingFunction"];
}): React.CSSProperties {
	const getDuration = (
		status: keyof typeof transitionStatuses,
		duration: TransitionDuration,
	) => {
		if (typeof duration === "number") {
			return duration;
		}
		if (status === "entering") {
			return duration.enter ?? 250;
		}
		return duration.exit ?? duration.enter ?? 250;
	};

	const shared = {
		transitionDuration: `${getDuration(status, duration)}ms`,
		transitionTimingFunction: timingFunction,
	};

	if (typeof transition === "string") {
		if (!(transition in transitions)) {
			return {};
		}

		return {
			transitionProperty: transitions[transition].transitionProperty,
			...shared,
			...transitions[transition].common,
			...transitions[transition][transitionStatuses[status]],
		};
	}

	return {
		transitionProperty: transition.transitionProperty,
		...shared,
		...transition.common,
		...transition[transitionStatuses[status]],
	};
}
