export function getFloatingValue(value: number, precision: number) {
	return Number.parseFloat(value.toFixed(precision));
}
