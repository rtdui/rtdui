// Corresponds to 10 frames at 60 Hz.
// A few bytes payload overhead when lodash/debounce is ~3 kB and debounce ~300 B.
export function debounce(func: (...args: any[]) => any, wait = 166) {
	let timeout: ReturnType<typeof setTimeout>;

	function debounced(this: any, ...args: any[]) {
		const later = () => {
			func.apply(this, args);
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	}

	debounced.clear = () => {
		clearTimeout(timeout);
	};

	return debounced;
}
