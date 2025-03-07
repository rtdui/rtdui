export function getColor(color: unknown): string | undefined {
	if (color === undefined) {
		return undefined;
	}

	switch (color as string) {
		case "neutral":
			return "var(--color-neutral)";
		case "primary":
			return "var(--color-primary)";
		case "secondary":
			return "var(--color-secondary)";
		case "accent":
			return "var(--color-accent)";
		case "info":
			return "var(--color-info)";
		case "success":
			return "var(--color-success)";
		case "warning":
			return "var(--color-warning)";
		case "error":
			return "var(--color-error)";
		case "base1":
			return "var(--color-base-100)";
		case "base2":
		case "default":
			return "var(--color-base-200)";
		case "base3":
			return "var(--color-base-300)";
		case "bc":
			return "var(--color-base-content)";
		default:
			return color as string;
	}
}

export function getContrastColor(color: unknown): string | undefined {
	if (color === undefined) {
		return undefined;
	}

	switch (color as string) {
		case "neutral":
			return "var(--color-neutral-content)";
		case "primary":
			return "var(--color-primary-content)";
		case "secondary":
			return "var(--color-secondary-content)";
		case "accent":
			return "var(--color-accent-content)";
		case "info":
			return "var(--color-info-content)";
		case "success":
			return "var(--color-success-content)";
		case "warning":
			return "var(--color-warning-content)";
		case "error":
			return "var(--color-error-content)";
		case "base1":
		case "base2":
		case "base3":
		default:
			return "var(--color-base-content)";
	}
}
