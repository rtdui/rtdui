import React from "react";

export function useCssSupport(conditionText: string, initialValue = false) {
	const [supported, setSupported] = React.useState(initialValue);

	React.useEffect(() => {
		if ("CSS" in window) {
			setSupported(CSS.supports(conditionText));
		}
	}, [conditionText]);

	return supported;
}
