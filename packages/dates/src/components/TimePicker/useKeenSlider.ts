import { type MutableRefObject, useCallback, useEffect, useRef } from "react";
import KeenSlider, {
	type KeenSliderHooks,
	type KeenSliderInstance,
	type KeenSliderOptions,
	type KeenSliderPlugin,
} from "keen-slider";
import { equal } from "../../utils";

export function useKeenSlider<
	T extends HTMLElement,
	O = {},
	P = {},
	H extends string = KeenSliderHooks,
>(
	options?: KeenSliderOptions<O, P, H>,
	plugins?: KeenSliderPlugin<O, P, H>[],
): [
	(node: T | null) => void,
	MutableRefObject<KeenSliderInstance<O, P, H> | null>,
] {
	const sliderRef = useRef<KeenSliderInstance<O, P, H> | null>(null);
	const optionsCheckedFirst = useRef(false);
	const currentOptions = useRef(options);

	const onRefChange = useCallback((node: T | null) => {
		if (node) {
			currentOptions.current = options;
			sliderRef.current = new KeenSlider<O, P, H>(node, options, plugins);
			optionsCheckedFirst.current = false;
		} else {
			if (sliderRef.current?.destroy) sliderRef.current.destroy();

			sliderRef.current = null;
		}
	}, []);
	useEffect(() => {
		if (equal(currentOptions.current, options)) return;
		currentOptions.current = options;
		if (sliderRef.current) sliderRef.current.update(currentOptions.current);
	}, [options]);

	return [onRefChange, sliderRef];
}
