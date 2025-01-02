export function getColor(color: unknown): string | undefined {
	if (color === undefined) {
		return undefined;
	}

	switch (color as string) {
		case "neutral":
			return "oklch(var(--n))";
		case "primary":
			return "oklch(var(--p))";
		case "secondary":
			return "oklch(var(--s))";
		case "accent":
			return "oklch(var(--a))";
		case "info":
			return "oklch(var(--in))";
		case "success":
			return "oklch(var(--su))";
		case "warning":
			return "oklch(var(--wa))";
		case "error":
			return "oklch(var(--er))";
		case "base1":
			return "oklch(var(--b1))";
		case "base2":
		case "default":
			return "oklch(var(--b2))";
		case "base3":
			return "oklch(var(--b3))";
		case "bc":
			return "oklch(var(--bc))";
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
			return "oklch(var(--nc))";
		case "primary":
			return "oklch(var(--pc))";
		case "secondary":
			return "oklch(var(--sc))";
		case "accent":
			return "oklch(var(--ac))";
		case "info":
			return "oklch(var(--inc))";
		case "success":
			return "oklch(var(--suc))";
		case "warning":
			return "oklch(var(--wac))";
		case "error":
			return "oklch(var(--erc))";
		case "base1":
		case "base2":
		case "base3":
		default:
			return "oklch(var(--bc))";
	}
}
