/**
 * Safe chained function.
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 */
export function createChainedFunction<Args extends any[], This>(
	...funcs: Array<((this: This, ...args: Args) => any) | undefined>
): (this: This, ...args: Args) => void {
	const fns = funcs.filter((d) => typeof d === "function") as Array<
		(this: This, ...args: Args) => any
	>;

	return fns.reduce(
		(acc, func) =>
			function chainedFunction(...args) {
				acc.apply(this, args);
				func.apply(this, args);
			},
		() => {},
	);
}
