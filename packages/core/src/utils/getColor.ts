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
      return "oklch(var(--b2))";
    case "base3":
      return "oklch(var(--b3))";
    default:
      return color as string;
  }
}
